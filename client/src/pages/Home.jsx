import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaRegClock, FaTicketAlt, FaShieldAlt, FaTimes } from 'react-icons/fa';
import BrandLogo from '../components/BrandLogo';

const featureCards = [
    {
        icon: FaRegClock,
        title: 'Quick Reservations',
        description: 'Secure your spot before tickets sell out with a fast and hassle-free booking experience.',
        iconClass: 'bg-gray-950 text-amber-300 shadow-gray-200/70',
        cardClass: 'bg-white border-gray-100 text-gray-950',
        textClass: 'text-gray-500',
    },
    {
        icon: FaTicketAlt,
        title: 'Digital Ticket Access',
        description: 'View, download, and manage your tickets anytime from your personal dashboard.',
        iconClass: 'bg-white text-gray-950 shadow-black/20',
        cardClass: 'bg-gray-950 border-gray-800 text-white shadow-xl',
        textClass: 'text-gray-300',
    },
    {
        icon: FaShieldAlt,
        title: 'Verified & Secure',
        description: 'Protect your account with OTP verification and secure authentication for every booking.',
        iconClass: 'bg-amber-100 text-gray-950 shadow-amber-100/70',
        cardClass: 'bg-white border-gray-100 text-gray-950',
        textClass: 'text-gray-500',
    },
];

const fallbackEventImageUrl = 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=900';

const getEventImageUrl = (imageUrl) => {
    if (!imageUrl) return '';

    if (imageUrl.includes('images.unsplash.com') && !imageUrl.includes('?')) {
        return `${imageUrl}?auto=format&fit=crop&q=80&w=900`;
    }

    return imageUrl;
};

const Home = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const eventsSectionRef = useRef(null);

    const scrollToEvents = () => {
        eventsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchEvents();
        }, 400); // 400ms debounce
        return () => clearTimeout(timeoutId);
    }, [search]);

    const fetchEvents = async () => {
        try {
            const { data } = await api.get(`/events?search=${search}`);
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="relative bg-black text-white rounded-3xl overflow-hidden mb-12 shadow-2xl min-h-[520px]">
                <div className="absolute inset-0 opacity-70 bg-[url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
                <div className="relative z-10 flex min-h-[520px] flex-col items-center justify-center px-6 py-12 text-center md:items-start md:px-16 md:text-left lg:px-20">
                    <span className="bg-white/12 text-amber-100 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase mb-6 border border-white/20 shadow-lg shadow-black/20">Welcome to EventHive</span>
                    <h1 className="max-w-4xl text-5xl md:text-7xl font-black mb-6 leading-[0.95] tracking-normal drop-shadow-lg">
                        Discover What <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-cyan-200">Moves You</span>
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl mb-10 max-w-2xl font-light leading-relaxed">
                        From career-defining conferences to unforgettable nights out, find experiences tailored to your interests.
                    </p>

                    <div className="w-full max-w-2xl relative flex items-center rounded-full bg-white p-1.5 shadow-2xl ring-1 ring-white/30 transition focus-within:ring-amber-300">
                        <FaSearch className="absolute left-6 text-gray-500 text-lg" />
                        <input
                            type="text"
                            placeholder="Search events by title..."
                            className="w-full min-w-0 pl-14 pr-28 py-4 rounded-full text-base sm:text-lg text-gray-950 bg-transparent focus:outline-none placeholder-gray-400 font-medium"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    scrollToEvents();
                                }
                            }}
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch('')}
                                className="absolute right-28 grid h-8 w-8 place-items-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
                                aria-label="Clear search"
                            >
                                <FaTimes className="text-sm" />
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={scrollToEvents}
                            className="absolute right-1.5 bg-gray-950 text-white px-5 py-3 rounded-full text-sm font-black hover:bg-black transition"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Why Choose Us / Features row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {featureCards.map(({ icon: Icon, title, description, iconClass, cardClass, textClass }) => (
                    <div key={title} className={`${cardClass} p-7 rounded-lg shadow-sm border flex flex-col items-start hover:-translate-y-1 hover:shadow-xl transition duration-300`}>
                        <div className={`${iconClass} w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-5 shadow-md`}>
                            <Icon />
                        </div>
                        <h3 className="text-lg font-black mb-2">{title}</h3>
                        <p className={`${textClass} text-sm leading-relaxed`}>{description}</p>
                    </div>
                ))}
            </div>

            <div ref={eventsSectionRef} className="scroll-mt-28 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8 px-2 border-b border-gray-200 pb-5">
                <div>
                    <span className="text-xs font-black uppercase tracking-widest text-amber-600">Fresh picks for you</span>
                    <h2 className="text-3xl sm:text-4xl font-black text-gray-950 mt-1">Events Coming Alive</h2>
                </div>
                <div className="text-sm font-bold text-gray-500">
                    {events.length} {events.length === 1 ? 'experience' : 'experiences'} waiting
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-xl font-semibold text-gray-600">Loading events...</div>
            ) : events.length === 0 ? (
                <div className="text-center py-20 text-xl text-gray-500">No events found matching your search.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map(event => (
                        <div key={event._id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-300 flex flex-col border border-gray-100">
                            <div className="h-52 bg-gray-950 overflow-hidden relative">
                                {event.image ? (
                                    <img
                                        src={getEventImageUrl(event.image)}
                                        alt={event.title}
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                                        onError={(imageEvent) => {
                                            imageEvent.currentTarget.onerror = null;
                                            imageEvent.currentTarget.src = fallbackEventImageUrl;
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-950 text-white font-bold text-2xl">
                                        {event.category || 'Event'}
                                    </div>
                                )}
                                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <div className="absolute left-4 top-4 bg-black/55 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                                    {event.category}
                                </div>
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-black shadow-sm">
                                    {event.ticketPrice === 0 ? <span className="text-green-600">FREE</span> : <span className="text-gray-900">₹{event.ticketPrice}</span>}
                                </div>
                            </div>
                            <div className="p-6 flex-grow flex flex-col">
                                <h2 className="text-xl font-black text-gray-950 mb-4 leading-tight">{event.title}</h2>
                                <div className="flex flex-col gap-3 mb-5 text-gray-600 text-sm">
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-500">
                                            <FaCalendarAlt />
                                        </span>
                                        <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-500">
                                            <FaMapMarkerAlt />
                                        </span>
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                                <div className="mt-auto">
                                    <div className="flex items-center justify-between text-xs font-bold text-gray-500 mb-2">
                                        <span>{event.availableSeats} seats left</span>
                                        <span>{event.totalSeats} total</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 mb-5">
                                        <div className="bg-gray-950 h-2 rounded-full" style={{ width: `${(event.availableSeats / event.totalSeats) * 100}%` }}></div>
                                    </div>
                                    <Link to={`/events/${event._id}`} className="block w-full text-center bg-gray-950 hover:bg-black text-white font-bold py-3 rounded-lg transition">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Footer Section */}
            <footer className="mt-auto pt-16 pb-8 border-t border-gray-200 text-center">
                <div className="flex justify-center mb-4">
                    <BrandLogo variant="dark" size="md" showTagline />
                </div>
                <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
                    The simplest, most dynamic way to manage, discover, and host world-class events in your local city. Let's make memories together.
                </p>
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    &copy; {new Date().getFullYear()} EventHive Platform. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default Home;
