const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Event = require('./models/Event');
const Booking = require('./models/Booking');

dotenv.config();

const users = [
    { name: 'Admin User', email: 'admin@eventhive.com', password: 'password123', role: 'admin' },
    { name: 'Demo User', email: 'user@eventhive.com', password: 'password123', role: 'user' },
    { name: 'Alice Smith', email: 'alice@eventhive.com', password: 'password123', role: 'user' },
    { name: 'Bob Johnson', email: 'bob@eventhive.com', password: 'password123', role: 'user' },
    { name: 'Charlie Dave', email: 'charlie@eventhive.com', password: 'password123', role: 'user' },
    { name: 'Diana Prince', email: 'diana@eventhive.com', password: 'password123', role: 'user' },
    { name: 'Ethan Hunt', email: 'ethan@eventhive.com', password: 'password123', role: 'user' },
    { name: 'Fiona Gallagher', email: 'fiona@eventhive.com', password: 'password123', role: 'user' },
    { name: 'George Miller', email: 'george@eventhive.com', password: 'password123', role: 'user' },
    { name: 'Hannah Montana', email: 'hannah@eventhive.com', password: 'password123', role: 'user' }
];

const events = [
    {
        title: 'Neon Nights EDM Festival',
        description: 'An electrifying night featuring top DJs, laser shows, and immersive stage experiences.',
        date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        location: 'Mumbai, Maharashtra',
        category: 'Music',
        totalSeats: 5000,
        ticketPrice: 1999,
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819'
    },
    {
        title: 'Arijit Singh Live Concert',
        description: 'Experience a magical evening of live music and unforgettable performances.',
        date: new Date(Date.now() + 22 * 24 * 60 * 60 * 1000),
        location: 'Kolkata, West Bengal',
        category: 'Concert',
        totalSeats: 12000,
        ticketPrice: 2999,
        image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a'
    },
    {
        title: 'React & AI Developer Meetup',
        description: 'Connect with developers, learn modern React patterns, AI integrations, and network with industry professionals.',
        date: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        location: 'Bangalore, Karnataka',
        category: 'Technology',
        totalSeats: 300,
        ticketPrice: 0,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'
    },
    {
        title: 'National Hackathon 2026',
        description: 'Build innovative solutions, compete for prizes, and collaborate with talented developers.',
        date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        location: 'Hyderabad, Telangana',
        category: 'Hackathon',
        totalSeats: 1000,
        ticketPrice: 499,
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d'
    },
    {
        title: 'Startup Pitch & Investor Summit',
        description: 'Meet founders, investors, and emerging startups shaping the future.',
        date: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000),
        location: 'Delhi NCR',
        category: 'Business',
        totalSeats: 500,
        ticketPrice: 999,
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7'
    },
    {
        title: 'Annual Cultural Fest - Udaan',
        description: 'Dance battles, music performances, fashion shows, and exciting competitions.',
        date: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
        location: 'Ranchi, Jharkhand',
        category: 'Cultural',
        totalSeats: 3000,
        ticketPrice: 199,
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f'
    },
    {
        title: 'NSS Blood Donation Camp',
        description: 'Donate blood and contribute towards saving lives. Open to all participants.',
        date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        location: 'Jamshedpur, Jharkhand',
        category: 'Social',
        totalSeats: 500,
        ticketPrice: 0,
        image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4'
    },
    {
        title: 'Street Food Carnival',
        description: 'Taste cuisines from across India with live music and entertainment.',
        date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        location: 'Pune, Maharashtra',
        category: 'Food',
        totalSeats: 2500,
        ticketPrice: 149,
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1'
    },
    {
        title: 'Stand-Up Comedy Night',
        description: 'An evening packed with laughter featuring top comedians and rising stars.',
        date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        location: 'Chennai, Tamil Nadu',
        category: 'Entertainment',
        totalSeats: 800,
        ticketPrice: 599,
        image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260'
    },
    {
        title: 'Inter-City Marathon 2026',
        description: 'Run alongside thousands of participants in one of the biggest fitness events of the year.',
        date: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
        location: 'Bhubaneswar, Odisha',
        category: 'Sports',
        totalSeats: 5000,
        ticketPrice: 299,
        image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5'
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eventhive');
        console.log('\n✅ MongoDB connection open...');

        await User.deleteMany();
        await Event.deleteMany();
        await Booking.deleteMany();
        console.log('🗑️  Cleared existing data.');

        // Hash user passwords
        const salt = await bcrypt.genSalt(10);
        const hashedUsers = users.map(u => ({
            ...u,
            password: bcrypt.hashSync(u.password, salt),
            isVerified: true
        }));

        const createdUsers = await User.insertMany(hashedUsers);
        const adminUser = createdUsers.find(u => u.role === 'admin');
        const normalUsers = createdUsers.filter(u => u.role === 'user');
        console.log(`👤 Created ${createdUsers.length} total dummy users.`);

        // Link events to admin
        const eventsWithAdmin = events.map(e => ({
            ...e,
            availableSeats: e.totalSeats,
            createdBy: adminUser._id
        }));

        const createdEvents = await Event.insertMany(eventsWithAdmin);
        console.log(`🎉 Created ${createdEvents.length} distinct events with Unsplash images.`);

        // Generate Bookings Data
        const bookingsData = [];

        for (const event of createdEvents) {
            // Assign 3-6 random users to each event
            const randomCount = Math.floor(Math.random() * 4) + 3;
            // Shuffle and pick random users
            const shuffledUsers = [...normalUsers].sort(() => 0.5 - Math.random());
            const selectedUsers = shuffledUsers.slice(0, randomCount);

            for (const user of selectedUsers) {
                // Randomize statuses
                const statuses = ['pending', 'confirmed', 'cancelled'];
                const status = statuses[Math.floor(Math.random() * statuses.length)];

                let paymentStatus = 'not_paid';
                if (status === 'confirmed' && event.ticketPrice > 0) {
                    // Usually confirmed tickets are marked paid (90% of the time)
                    paymentStatus = Math.random() > 0.1 ? 'paid' : 'not_paid';
                } else if (event.ticketPrice === 0) {
                    paymentStatus = 'paid';
                }

                bookingsData.push({
                    userId: user._id,
                    eventId: event._id,
                    status: status,
                    paymentStatus: paymentStatus,
                    amount: event.ticketPrice
                });

                // Deduct available seats specifically for confirmed tickets!
                if (status === 'confirmed') {
                    event.availableSeats -= 1;
                    await event.save();
                }
            }
        }

        await Booking.insertMany(bookingsData);
        console.log(`🎫 Inserted ${bookingsData.length} randomized dummy bookings (confirmed, pending, cancelled, paid, not_paid).`);

        console.log('\n🚀 Database seeded successfully!');
        console.log('-------------------------------------------');
        console.log('Admin Email: admin@eventhive.com');
        console.log('User Email:  user@eventhive.com');
        console.log('Password for all users: password123');
        console.log('-------------------------------------------\n');

        process.exit();
    } catch (error) {
        console.error('❌ Error seeding data:', error);
        process.exit(1);
    }
};

seedDatabase();
