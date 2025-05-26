import React from 'react';

const Blog = () => {
  const topReads = [
    {
      id: 1,
      title: "How Telemedicine is Changing Healthcare",
      excerpt: "Discover the benefits of virtual doctor visits and how they're making healthcare more accessible.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 2,
      title: "5 Tips for Finding the Right Specialist",
      excerpt: "Learn how to choose the perfect doctor for your specific health needs.",
      image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      title: "Preparing for Your First Online Consultation",
      excerpt: "Everything you need to know to make your virtual doctor appointment successful.",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  const blogCards = [
    {
      id: 1,
      title: "The Importance of Regular Check-ups",
      excerpt: "Why annual physical exams are crucial for preventive healthcare.",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: "May 15, 2023"
    },
    {
      id: 2,
      title: "Managing Chronic Conditions Remotely",
      excerpt: "How digital healthcare platforms help patients with ongoing conditions.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: "April 28, 2023"
    },
    {
      id: 3,
      title: "Pediatric Care in the Digital Age",
      excerpt: "What parents should know about online pediatric consultations.",
      image: "blog.jpg",
      date: "April 10, 2023"
    },
    {
      id: 4,
      title: "Mental Health Support Through Telemedicine",
      excerpt: "How virtual therapy sessions are breaking down barriers to mental healthcare.",
      image: "https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: "March 22, 2023"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Main Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Left Section - Latest */}
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">The Latest</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Doctor consultation" 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">The Future of Healthcare: Digital Doctor Appointments</h3>
              <p className="text-gray-600 mb-4">
                The healthcare industry is undergoing a digital transformation, with online doctor appointments becoming the new norm. 
                This shift is making healthcare more accessible, reducing wait times, and allowing patients to consult with specialists 
                from the comfort of their homes.
              </p>
              <p className="text-gray-500 text-sm">
                Published on May 20, 2023 • 8 min read • By Dr. Avinash
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Top Reads */}
        <div className="md:w-1/3">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Top Reads</h2>
          <div className="space-y-6">
            {topReads.map((item) => (
              <div key={item.id} className="flex gap-4">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Cards Section */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8">More Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogCards.map((card) => (
          <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img 
              src={card.image} 
              alt={card.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <p className="text-gray-500 text-sm mb-2">{card.date}</p>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{card.excerpt}</p>
              {/* <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Read More →
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;