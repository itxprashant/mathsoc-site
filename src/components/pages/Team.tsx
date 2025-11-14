import React, { useEffect, useState } from 'react';
import teamMembersData from '../../data/teamMembers.json';

interface TeamMember {
  name: string;
  position: string;
  image: string;
  social?: {
    email?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
}

const Team: React.FC = () => {
  const teamMembers: TeamMember[] = teamMembersData;
  const [animatedMembers, setAnimatedMembers] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Trigger animations with staggered delays
    teamMembers.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedMembers(prev => new Set(prev).add(index));
      }, index * 100); // 100ms delay between each member
    });
  }, [teamMembers]);

  // Group team members by position
  const groupedMembers = {
    'Overall Coordinator': teamMembers.filter(member => member.position === 'Overall Coordinator'),
    'Coordinator': teamMembers.filter(member => member.position === 'Coordinator'),
    'Panel Members': teamMembers.filter(member => member.position === 'Panel Member'),
    'Convenors': teamMembers.filter(member => member.position === 'Convenor' || member.position === 'Convener'),
    'Executives': teamMembers.filter(member => member.position === 'Executive')
  };

  const renderSocialLinks = (social?: TeamMember['social']) => {
    if (!social) return null;

    return (
      <div className="mem-social">
        {social.email && (
          <a href={`mailto:${social.email}`} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-envelope"></i>
          </a>
        )}
        {social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-linkedin"></i>
          </a>
        )}
        {social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram"></i>
          </a>
        )}
        {social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-facebook"></i>
          </a>
        )}
      </div>
    );
  };

  const renderSection = (title: string, members: TeamMember[], startIndex: number) => {
    if (members.length === 0) return null;
    
    // Determine grid layout based on title and member count
    let colClass = "col-md-6 col-lg-4"; // Default 3 columns on large screens
    let rowClass = "row";
    
    if (title === "Overall Coordinator") {
      // Center the Overall Coordinator
      colClass = "col-md-8 col-lg-6";
      rowClass = "row justify-content-center";
    } else if (members.length === 4) {
      // 2x2 grid for exactly 4 members
      colClass = "col-md-6 col-lg-6";
      rowClass = "row justify-content-center";
    }
    
    return (
      <div className="team-section" key={title}>
        <h3 className="team-section-title">{title}</h3>
        <div className={rowClass}>
          {members.map((member, index) => {
            const globalIndex = startIndex + index;
            const isAnimated = animatedMembers.has(globalIndex);
            
            return (
              <div key={index} className={colClass}>
                <div className={`mem ${isAnimated ? 'fade-in' : ''}`}>
                  <img className="mem-dp" src={member.image} alt={member.name} /> 
                  <div className="mem-name">{member.name}</div>
                  <div className="mem-pos">{member.position}</div>
                  {renderSocialLinks(member.social)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="section" id="team">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Our Team</h2>

            {(() => {
              let startIndex = 0;
              return Object.entries(groupedMembers).map(([title, members]) => {
                const section = renderSection(title, members, startIndex);
                startIndex += members.length;
                return section;
              });
            })()}

          </div>  
        </div>    
      </div>    
    </div>
  );
};

export default Team;