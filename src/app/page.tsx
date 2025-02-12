"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [cronJobs, setCronJobs] = useState([]);
  const [newCronJob, setNewCronJob] = useState({
    name: '',
    link: '',
    schedule: '',
    startDate: '',
    apiKey: '',
  });
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch all cron jobs from the backend
  const fetchCronJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/cron-jobs');
      setCronJobs(response.data);
    } catch (error) {
      console.error('Error fetching cron jobs:', error);
    }
  };

  // Handle form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCronJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to create a new cron job
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/cron-jobs', newCronJob);
      if (response.status === 201) {
        setModalVisible(false); // Hide modal on success
        fetchCronJobs(); // Reload cron jobs list
      }
    } catch (error) {
      console.error('Error creating cron job:', error);
    }
  };

  // Handle deleting a cron job
  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/cron-jobs/${id}`);
      if (response.status === 200) {
        fetchCronJobs(); // Reload cron jobs list
      }
    } catch (error) {
      console.error('Error deleting cron job:', error);
    }
  };

  // Show modal for creating a new cron job
  const openModal = () => setModalVisible(true);

  // Close modal
  const closeModal = () => setModalVisible(false);

  // Fetch cron jobs on component mount
  useEffect(() => {
    fetchCronJobs();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Cron Job Manager</h1>

      <div className="mb-4">
        <button
          onClick={openModal}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Create New Cron Job
        </button>
      </div>

      {/* Cron Jobs List */}
      <div id="cronJobList" className="space-y-4">
        {cronJobs.length === 0 ? (
          <p>No cron jobs available. Create a new one!</p>
        ) : (
          cronJobs.map((job: any) => (
            <div key={job._id} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl">{job.name}</h3>
              <p>Link: {job.link}</p>
              <p>Schedule: {job.schedule}</p>
              <p>Start Date: {new Date(job.startDate).toLocaleString()}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleDelete(job._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for creating a new cron job */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-2xl font-semibold text-indigo-600">Create Cron Job</h2>
            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="text"
                name="name"
                value={newCronJob.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                placeholder="Cron Job Name"
                required
              />
              <input
                type="text"
                name="link"
                value={newCronJob.link}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                placeholder="Cron Job Link"
                required
              />
              <input
                type="text"
                name="schedule"
                value={newCronJob.schedule}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                placeholder="Cron Job Schedule (e.g., '0 0 * * *')"
                required
              />
              <input
                type="datetime-local"
                name="startDate"
                value={newCronJob.startDate}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                required
              />
              <input
                type="text"
                name="apiKey"
                value={newCronJob.apiKey}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
                placeholder="API Key"
                required
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Submit
              </button>
            </form>
            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
