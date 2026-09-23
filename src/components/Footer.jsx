import React from "react";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pro-footer">
      <div className="pro-footer-inner">
        <div className="pro-footer-brand fade-in-up">
          <span className="pro-footer-kicker">Community record · Coppell, Texas</span>
          <h2>Coppell<br />Archive</h2>
          <p className="pro-footer-text">
            A student-built record of Coppell’s community, culture, local
            organizations, and history—made to keep local stories visible and
            accessible.
          </p>
        </div>

        <nav className="pro-footer-col fade-in-up delay-1" aria-label="Featured organizations">
          <h3 className="pro-footer-title">Featured Groups</h3>
          <ul className="pro-footer-links">
            <li><a href="https://coppellfarmersmarket.org/" target="_blank" rel="noopener noreferrer">Coppell Farmers Market <span>↗</span></a></li>
            <li><a href="https://www.notelove.org/" target="_blank" rel="noopener noreferrer">NoteLove <span>↗</span></a></li>
            <li><a href="https://metrocrestservices.org/" target="_blank" rel="noopener noreferrer">Metrocrest Services <span>↗</span></a></li>
            <li><a href="https://www.instagram.com/neighbors_in_need_/" target="_blank" rel="noopener noreferrer">Neighbors In Need <span>↗</span></a></li>
          </ul>
        </nav>

        <div className="pro-footer-col fade-in-up delay-2">
          <h3 className="pro-footer-title">Archive Desk</h3>
          <p className="pro-footer-text">
            <MapPin size={16} aria-hidden="true" /> Coppell, Texas
          </p>

          <p className="footer-contact">
            <Mail size={16} aria-hidden="true" />
            <a href="mailto:coppellwebteam@gmail.com">coppellwebteam@gmail.com</a>
          </p>
          <p className="pro-footer-note">Have a local story, photo, or correction? Send it to the archive team.</p>
        </div>
      </div>

      <div className="pro-footer-bottom">
        <span>© {year} Coppell Community Archive</span>
        <span>Built by local students · Made for the community</span>
      </div>
    </footer>
  );
}
