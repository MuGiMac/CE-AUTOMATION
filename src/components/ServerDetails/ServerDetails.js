import { useEffect, useState } from 'react';
import './ServerDetails.css';
import '../images/logo.png';

const serverData = [
  {
    name: "MCHP021A",
    hostName: "mchp021a.unify.com",
    ip: "172.29.37.189",
    os: "Windows",
    ram: 8,
    owner: "Didier Genard",
    env: "Integration",
    status: "Running"
  },
  {
    name: "MCHP026A",
    hostName: "mchp026a.unify.com",
    ip: "172.29.37.229",
    os: "Windows",
    ram: 8,
    owner: "Didier Genard",
    env: "Integration",
    status: "Running"
  },
  {
    name: "MCHP025A",
    hostName: "mchp025a.unify.com",
    ip: "172.29.38.122",
    os: "Windows",
    ram: 8,
    owner: "Didier Genard",
    env: "Integration",
    status: "Running"
  },
  {
    name: "MCHP029A",
    hostName: "mchp029a.unify.com",
    ip: "172.29.37.221",
    os: "Windows",
    ram: 8,
    owner: "Didier Genard",
    env: "Production",
    status: "Running"
  },
  {
    name: "MCHP028A",
    hostName: "mchp028a.unify.com",
    ip: "172.29.37.224",
    os: "Windows",
    ram: 8,
    owner: "Didier Genard",
    env: "Production",
    status: "Running"
  },
  {
    name: "MCHP027A",
    hostName: "mchp027a.unify.com",
    ip: "172.29.38.98",
    os: "Windows",
    ram: 8,
    owner: "Didier Genard",
    env: "Production",
    status: "Running"
  }
];

const ServerDetails = () => {
  return (
    <div className="ServerDetails-container">
      <nav className="ServerDetails-nav">
        <div className="ServerDetails-logo">
          <img src={require('../images/logo.png')} alt="Logo" className="ServerDetails-logo-img" />
        </div>
        <div className="ServerDetails-nav-spacer"></div>
      </nav>

      <h1 className="ServerDetails-title">🖥️ Server Details</h1>

      <main className="ServerDetails-main">
        <table className="ServerDetails-table">
          <thead>
            <tr>
              <th>Server Name</th>
              <th>Host Name</th>
              <th>IP Address</th>
              <th>OS Type</th>
              <th>RAM (GB)</th>
              <th>Owner</th>
              <th>Environment</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {serverData.map((server, index) => (
              <tr key={index}>
                <td>{server.name}</td>
                <td>{server.hostName}</td>
                <td>{server.ip}</td>
                <td>{server.os}</td>
                <td>{server.ram}</td>
                <td>{server.owner}</td>
                <td>{server.env}</td>
                <td>{server.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer className="ServerDetails-footer">
        © 2025 Mitel Networks Corporation
      </footer>
    </div>
  );
};

export default ServerDetails;
