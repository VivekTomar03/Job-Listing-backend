const express = require('express');
const authenticate = require('../middleware/authenticate');
const { JOB } = require('../modal/job');
const userauth = require('../middleware/userauth');
const jobRouter = express.Router();

jobRouter.post('/create', authenticate, async (req, res) => {
    try {
        console.log(req.body)
        const newJob = new JOB(req.body);
        await newJob.save();
        res.status(201).json({ message: 'Job listing created successfully.' });
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: 'Error creating job listing.' });
    }
});

jobRouter.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const searchQuery = req.query.q || '';
        const sortBy = req.query.sortBy || ''; // Get sorting order: 'asc' or 'desc'
        const startIndex = (page - 1) * limit;

        const totalJobs = await JOB.countDocuments({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { companyName: { $regex: searchQuery, $options: 'i' } }
            ]
        });
        const totalPages = Math.ceil(totalJobs / limit);

        let sortField = ''; // The field to sort by (ctc)
        let sortOrder = 1;  // 1 for ascending, -1 for descending

        if (sortBy.toLowerCase() === 'desc') {
            sortOrder = -1;
        }

        const jobs = await JOB.find(
            {
                $or: [
                    { title: { $regex: searchQuery, $options: 'i' } },
                    { companyName: { $regex: searchQuery, $options: 'i' } }
                ]
            }
        )
            .sort({ ctc: sortOrder }) // Sort by ctc field
            .skip(startIndex)
            .limit(limit);

        res.status(200).json({
            data: jobs,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job listings.' });
    }
});


jobRouter.delete("/:id", authenticate, async (req, res) =>{
    try {
        const jobId = req.params.id;

      
        const deletedJob = await JOB.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        res.status(200).json({ message: 'Job listing deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job listing.' });
    }

})

jobRouter.put('/:id', authenticate, async (req, res) => {
    try {
        const jobId = req.params.id;
        const updatedJob = await JOB.findByIdAndUpdate(
            jobId,
             req.body,
            { new: true } 
        );

        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        res.status(200).json({ message: 'Job listing updated successfully.', job: updatedJob });
    } catch (error) {
        res.status(500).json({ message: 'Error updating job listing.' });
    }
});




jobRouter.get('/:id', async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await JOB.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job listing.' });
    }
})


jobRouter.post('/:id/apply', userauth, async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user._id // Authenticated user's ID

        // Find the job by ID
        const job = await JOB.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        // Check if the user has already applied
        if (job.applications.includes(userId)) {
            return res.status(400).json({ message: 'You have already applied for this job.' });
        }

        // Add the user's ID to the applications array
        job.applications.push(userId);
        await job.save();

        res.status(201).json({ message: 'Job application submitted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error applying for the job.' });
    }
});

jobRouter.get('/:id/applications', authenticate, async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find the job by ID
        const job = await JOB.findById(jobId).populate('applications', '-password');

        if (!job) {
            return res.status(404).json({ message: 'Job not found.' });
        }

        res.status(200).json({ applications: job.applications });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching applications for the job.' });
    }
});


module.exports = jobRouter;






