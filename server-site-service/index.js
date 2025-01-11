const express = require('express');
const cors = require('cors');
require('dotenv').config()
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()

// middle ware
// step 3 
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://service-auth-4ebdb.web.app',
        'https://service-auth-4ebdb.firebaseapp.com'
    ],
    credentials: true,
}))
app.use(express.json())
// step 1 for set jwt
app.use(cookieParser())

// verify token
const verifyToken = (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders || !authHeaders.startsWith('Bearer ')) {
        return res.status(401).send({ message: 'Unauthorized access, no token provided' });
    }

    const token = authHeaders.split(' ')[1]; // Correctly split by space to extract the token

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized access' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized access' });
        }

        req.user = decoded; // Attach the decoded user info to the request
        next(); // Proceed to the next middleware or route handler
    });
};



const uri = `mongodb+srv://${process.env.SERVICE_USER}:${process.env.SERVICE_PASS}@cluster0.xlnwpku.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const serviceCollection = client.db("serviceDB").collection("service")
        const reviewCollection = client.db("serviceDB").collection("all-review")

        // STEP 2  auth related api and post clients site onAuthStateChanged
        app.post('/jwt', (req, res) => {
            const user = req.body
            // console.log('jwt user', user);
            const token = jwt.sign(user, process.env.ACCESS_TOKEN, {
                expiresIn: '365d'
            })
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production"
            })
                .send({ success: true })
        })

        // logout and clear cookie/token
        app.post('/logout', (req, res) => {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production"
            }).send({ success: true })
        })

        // post all service
        app.post('/add-service', async (req, res) => {
            const { email } = req.query;
            const service = req.body;

            // Log request for debugging
            // console.log('JWT User Email:', req?.user?.email);
            // console.log('Query Email:', email);

            //   Validate email from JWT and query parameter
            // if (!email) {
            //     return res.status(400).json({ error: 'Missing email in query parameter' });
            // }

            // if (req?.user?.user !== email) {
            //     return res.status(403).json({ error: 'Unauthorized Access: Email mismatch' });
            // }

            try {
                // Insert the service into the database
                const result = await serviceCollection.insertOne(service);
                res.status(200).send({ message: 'Service added successfully', result });
            } catch (error) {
                // Log and return an error response if the insertion fails
                // console.error('Service post error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });



        // get all service
        app.get('/home-service', async (req, res) => {
            try {
                const { search } = req?.query
                //  console.log(search);
                const query = {}
                if (search) query.title = { $regex: search, $options: 'i' }
                const result = await serviceCollection.find(query).limit(6).toArray();
                res.send(result);
            } catch (error) {
                // console.error('Error fetching data:', error);
                res.status(500).send({ error: 'Internal Server Error' });
            }
        });


        // get service detail route
        app.get('/serviceDetails/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await serviceCollection.findOne(query);
            res.send(result)
        })

        // add review api
        app.post('/addReview', async (req, res) => {
            const allReview = req.body;
            const result = await reviewCollection.insertOne(allReview)

            // review count increment
            const filter = { _id: new ObjectId(allReview.JobId) }
            const updateCount = {
                $inc: {
                    reviewCount: 1
                }
            }
            console.log(allReview.JobId);
            const updated = await serviceCollection.updateOne(filter, updateCount)
            res.send(result)
        })

        // my service api
        app.get('/my-service', async (req, res) => {

            try {
                const { email, search } = req.query

                // verify  with jwt
                // if (req?.user?.user !== req.query.email) {
                //     return res.status(403).json({ error: 'Unauthorized access' });
                // }

                const query = {}
                if (email) query.email = email
                if (search) query.title = { $regex: search, $options: 'i' }

                const result = await serviceCollection.find(query).toArray();
                //  console.log(result);
                res.send(result)
            }
            catch (err) {
                // console.log(err);
            }

        })

        // updated service
        app.put('/update-myService', async (req, res) => {
            const idNo = req.query.id;
            const email = req.query.email;
            const filter = { _id: new ObjectId(idNo) };
            const body = req.body;

            // Verify token user email
            // if (req?.user?.user !== email) {
            //     return res.status(403).json({ error: 'Unauthorized access' });
            // }

            const updatedDoc = {
                $set: {
                    image: body?.image,
                    title: body?.title,
                    description: body?.description,
                    priceRance: body?.priceRance,
                    company_name: body?.company_name,
                    wevsite: body?.wevsite,
                    deadline: body?.deadline,
                    buyerInfo: body?.buyerInfo,
                    category: body?.category,
                }
            };

            try {
                const updatedDocument = await serviceCollection.updateOne(filter, updatedDoc);
                //  console.log('Updated Document:', updatedDocument);
                res.send(updatedDocument);
            } catch (err) {
                //  console.error('Update Error:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        })

        // get my review
        app.get('/my-review', async (req, res) => {
            const email = req.query.email
            const query = { email }
            const { search } = req?.query
            // console.log('search', search);
            let option = {}
            if (search) {
                option = { review: { $regex: search, $options: 'i' } }
            }
            const result = await reviewCollection.find(query, option).toArray()
            res.send(result)
        })

        // all review
        app.get('/all-review', async (req, res) => {
            const result = await reviewCollection.find().toArray()
            res.send(result)
        })
        // update review api
        app.get('/update-review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await reviewCollection.findOne(query)
            res.send(result)
        })

        // service delete api 
        app.delete('/service-delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await serviceCollection.deleteOne(query);
            res.send(result)
        })

        // updated service
        app.put('/update-myReview/:id', async (req, res) => {
            const idNo = req.params.id;
            const filter = { _id: new ObjectId(idNo) }
            const body = req.body;
            const updatedDoc = {
                $set: {
                    review: body?.review,
                    title: body?.title,
                    ratings: body?.ratings,
                    email: body?.email,
                    deadline: body?.deadline,


                }
            }
            const updatedDocument = await reviewCollection.updateOne(filter, updatedDoc)
            // console.log(updatedDocument);
            res.send(updatedDocument)
        })

        // REVIEW DELETE
        app.delete('/review-delete/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await reviewCollection.deleteOne(query);
            res.send(result)
        })

        // all service api
        app.get('/service', async (req, res) => {
            const filter = req?.query?.filter
            const search = req?.query?.search
            const sort = req?.query?.sort
            let options = {}
            if (sort) options = { sort: { deadline: sort === 'dsc' ? -1 : 1 } }
            const query = {
                title: {
                    $regex: search,
                    $options: 'i'
                }

            }

            if (filter) {
                query.category = filter
            }

            const result = await serviceCollection.find(query, options).toArray()
            res.send(result)

        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', async (req, res) => {
    res.send('service server is running')
});

app.listen(port, () => {
    //  console.log(`service server in running on ${port}`);
})
