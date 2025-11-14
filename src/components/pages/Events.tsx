import React, { useEffect, useState, useRef } from 'react';

interface Event {
  date: string;
  name: string;
  description: string;
  participation: string;
  isUpcoming?: boolean;
  isPast?: boolean;
  isLatestUpcoming?: boolean;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const latestUpcomingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parse the events data from the CSV structure
    const eventsData: Event[] = [
      {
        date: "Summer 2025",
        name: "WolframWho - CAIC Summer of Tech",
        description: "Series of topical handouts to prepare students for the Inter IIT Tech Meet",
        participation: "50 students from 2nd year",
        isPast: true
      },
      {
        date: "Summer 2025",
        name: "Corporate Intern Fundae and Intern Prep Series",
        description: "Series of quant interview questions, puzzles and brainteasers. Informative event to explain the process of corporate internships, sharing experiences how to prepare.",
        participation: "200 students from 2nd year (now 3rd year) (mostly MnC CSE EE)",
        isPast: true
      },
      {
        date: "Jun 28, 2025",
        name: "Da Vinci Trading League",
        description: "Trading Simulation competition in collaboration with Da Vinci, an Amsterdam-based trading firm",
        participation: "200 students from 2nd Year (now 3rd year)",
        isPast: true
      },
      {
        date: "Jul 07, 2025",
        name: "JEE Open House",
        description: "Guiding students in making the right choice in their JEE Counselling. Designed poster for the mathematics department",
        participation: "100-150 students entering college",
        isPast: true
      },
      {
        date: "Aug 24, 2025",
        name: "Tour of Stalls",
        description: "Showcasing freshers of what MathSoc has to offer. Goodies for students",
        participation: "600 students from 1st Year",
        isPast: true
      },
      {
        date: "Aug 25-31, 2025",
        name: "DRW Quantitative Insights with Sudeep Gupta",
        description: "1 on 1 discussion with head of Cumberland Trading DRW to gain insights in crypto trading",
        participation: "Invite-only event, 15-20 students from 4th-5th year",
        isPast: true
      },
      {
        date: "Aug 26, 2025",
        name: "Pre-SMMC",
        description: "Prelims for SMMC since the Simon Marais Foundation has imposed a restriction of 100 registrants.",
        participation: "300 Students across 1st to 4th years",
        isPast: true
      },
      {
        date: "Sep 04, 2025",
        name: "Freshers' Orientation (UG+PG)",
        description: "Introducing MathSoc to the freshers of the department. Welcome Kit with goodies",
        participation: "120 students from 1st year MnC",
        isPast: true
      },
      {
        date: "Sep 08, 2025",
        name: "Research Intern Fundae",
        description: "Informative event to explain the process of applying to research internships, sharing experiences and seeing if its the right option for you",
        participation: "Expecting 100 students from 2nd year",
        isPast: true
      },
      {
        date: "Sep 08, 2025",
        name: "School Students Visit",
        description: "Recreational math demonstrations for some school students visiting IITD",
        participation: "100 school students",
        isPast: true
      },
      {
        date: "Sep 21, 2025",
        name: "Fresher's Party + Welcome Kit",
        description: "2025 Batch MT1 and MT6",
        participation: "80 first year students",
        isPast: true
      },
      {
        date: "Oct 05 & 29, 2025",
        name: "The Ultimate Bluff - Poker Tournament",
        description: "Open for all",
        participation: "expecting 400 students across years",
        isPast: true
      },
      {
        date: "Oct 08, 2025 onwards",
        name: "GabFest Series",
        description: "Biweekly Series- Informal talks with professors",
        participation: "Expecting 50 students per session, mostly 1st year",
        isPast: true
      },
      {
        date: "Oct 08, 2025 onwards",
        name: "Beyond Lectures: Student Lecture Series",
        description: "Biweekly series- Research Talks by students, UG, PG and PhDs",
        participation: "Expecting 50 students per session, mostly final year",
        isPast: true
      },
      {
        date: "Before Oct 13, 2025",
        name: "Integration Bee",
        description: "Flagship event of Semester 1- Inspired from MIT's Integration Bee Competition",
        participation: "300 students from 1st to 4th years",
        isPast: true
      },
      {
        date: "Oct 09, 2025",
        name: "MathBowl - CAIC Week",
        description: "Selections for the Inter IIT MathBowl Event",
        participation: "400 students across 5 years",
        isPast: true
      },
      {
        date: "Oct 11, 2025",
        name: "Simon Marais Mathematics Competition",
        description: "IIT Delhi is participating in SMMC for the 3rd time. It is a math competition organised by Simon Marais Foundation with lucrative prize money and internship opportunities. This time we have a cap of 100 registrants.",
        participation: "150 students who have qualified the Pre-SMMC",
        isPast: true
      },
      {
        date: "Oct 18, 2025",
        name: "Khel-culus - Mathematics Department Sports Event",
        description: "Maths dept. PhD students, the HoD, and MathSoc are organising a sports event exclusively for the students, faculty and staff of the dept. to participate in. There will be sports like cricket, football, badminton, volleyball, as well as indoor sports.",
        participation: "200 students from the mathematics department",
        isUpcoming: true,
        isLatestUpcoming: true
      },
      {
        date: "Nov 10, 2025",
        name: "Mathematics Department and Society Hoodies + TShirts",
        description: "Design and produce 3 different designs of hoodies and distribute around 400+ items",
        participation: "400 units of department hoodies/tshirts, 100 units MathSoc hoodies/TShirts",
        isUpcoming: true
      }
    ];

    // Add upcoming events for Semester 2
    const semester2Events: Event[] = [
      {
        date: "Jan-Apr 2026",
        name: "Quant ke Fundae",
        description: "Series of Talks from Seniors who have done Quant Internships explaining the field and their experience, followed by problem solving sessions and mock interviews",
        participation: "Expecting 100 students per session",
        isUpcoming: true
      },
      {
        date: "Jan 2026",
        name: "MathSoc IITD Invitational",
        description: "An All-India Online Math competition for students from top 3 IITs, followed by on-campus sessions for top students to give exposure to advanced areas of mathematics and theoretical CS",
        participation: "Expecting 800-1000 registrations for the first round",
        isUpcoming: true
      },
      {
        date: "Jan 2026",
        name: "Trap-ezoid",
        description: "We create a mathematical escape room",
        participation: "Expecting 300 students across years",
        isUpcoming: true
      },
      {
        date: "Jan 2026",
        name: "The Number Games",
        description: "Tournament of math games and puzzles - kenken, arithmetic games, dice chess, estimathon",
        participation: "Expecting 300 students across years",
        isUpcoming: true
      },
      {
        date: "Feb 2026",
        name: "Decipher D' Cipher",
        description: "Cryptography + Treasure Hunt Contest",
        participation: "Expecting 200 students across years",
        isUpcoming: true
      },
      {
        date: "Feb 2026",
        name: "Bid and Conquer",
        description: "An exciting combination of Auction, Strategy Making and Math, where students bid on problems and realise their value by solving them",
        participation: "Expecting 200 students across years",
        isUpcoming: true
      },
      {
        date: "Feb 2026",
        name: "Khel-culus 2.0 - Maths Department Sports Event",
        description: "Departmental Sports event, indoor, outdoor and fun games.",
        participation: "200 students from the mathematics department",
        isUpcoming: true
      },
      {
        date: "Apr 2026",
        name: "Farewell (UG)",
        description: "Department Farewell organised for 2022MT1 and 2021MT6 batches",
        participation: "130 final year students",
        isUpcoming: true
      }
    ];

    setEvents([...eventsData, ...semester2Events]);

    // Auto-scroll to latest upcoming event
    setTimeout(() => {
      if (latestUpcomingRef.current) {
        latestUpcomingRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 1000);

    // Add icons after component mounts
    const addIcons = () => {
      document.querySelectorAll('.ev-content .ev-venue').forEach(element => {
        if (!element.querySelector('.fa-map-marker')) {
          element.innerHTML = "<i class='fa fa-map-marker' style='width: 18px;text-align:center;'></i> &nbsp" + element.innerHTML;
        }
      });
      
      document.querySelectorAll('.ev-content .ev-time').forEach(element => {
        if (!element.querySelector('.fa-clock-o')) {
          element.innerHTML = "<i class='fa fa-clock-o' style='width: 18px;text-align:center;'></i> &nbsp" + element.innerHTML;
        }
      });
      
      document.querySelectorAll('.ev-content .ev-date').forEach(element => {
        if (!element.querySelector('.fa-calendar')) {
          element.innerHTML = "<i class='fa fa-calendar' style='width: 18px;text-align:center;'></i> &nbsp" + element.innerHTML;
        }
      });
    };

    setTimeout(addIcons, 100);
  }, []);

  const renderEvent = (event: Event, index: number) => {
    const isLeft = index % 2 === 0;
    const containerClass = `ev-container ${isLeft ? 'left' : 'right'}`;
    
    return (
      <div 
        key={index} 
        className={`${containerClass} ${event.isLatestUpcoming ? 'latest-upcoming' : ''}`}
        ref={event.isLatestUpcoming ? latestUpcomingRef : null}
      >
        <div className="ev-content">
          {event.isLatestUpcoming && (
            <div className="beacon-container">
              <div className="beacon"></div>
              <div className="beacon-text">Next Event!</div>
            </div>
          )}
          <div className="ev-title">{event.name}</div>
          <div className="ev-desc">{event.description}</div>
          <div className="ev-info">
            <div className="ev-date">{event.date}</div>
            <div className="ev-venue">{event.participation}</div>
          </div>
          {event.isUpcoming && (
            <div className="ev-link">
              <span 
                className="ev-btn" 
                style={{ 
                  backgroundColor: event.isLatestUpcoming ? '#ff6b35' : '#28a745' 
                }}
              >
                {event.isLatestUpcoming ? 'Next Event!' : 'Upcoming'}
              </span>
            </div>
          )}
          {event.isPast && (
            <div className="ev-link">
              <span className="ev-btn" style={{ backgroundColor: '#6c757d' }}>
                Completed
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="section" id="events">
      <div className="container">
        <h2>Events</h2>
        <p style={{ marginBottom: '30px', fontSize: '16px', color: '#666' }}>
          Explore our comprehensive list of events throughout the academic year, from technical competitions 
          to social gatherings and educational workshops.
        </p>

        <div className="timeline">
          {events.map((event, index) => renderEvent(event, index))}
        </div>

        <div className="msg-box">
          <strong>Semester 2 Events:</strong> More exciting events planned for the upcoming semester! 
          Stay tuned for registration details and updates.
        </div>

        <p style={{ textAlign: 'right', marginTop: '20px' }}>
          <i>*All dates are tentative and subject to change. Follow our social media for updates!</i>
        </p>

      </div> 
    </div>
  );
};

export default Events;