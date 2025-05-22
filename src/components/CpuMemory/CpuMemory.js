import { useEffect, useState } from 'react';
import './CpuMemory.css';
import '../images/logo.png';

const MOCK_DATA = [
  {
    serverName: "MCHP021A",
    cpuUsage: 34.5,
    usedMemory: 2048,
    totalMemory: 4096,
    services: [
      { name: "Entrust GetAccess Service", cpu: 25, memory: 40 },
      { name: "Dirx Service", cpu: 10, memory: 15 },
      { name: "Tomcat", cpu: 10, memory: 15 }
    ]
  },
  {
    serverName: "MCHP026A",
    cpuUsage: 68.2,
    usedMemory: 3072,
    totalMemory: 4096,
    services: [
      { name: "Entrust GetAccess Service", cpu: 25, memory: 40 },
      { name: "IIS Service", cpu: 10, memory: 15 },
      { name: "Tomcat", cpu: 10, memory: 15 }
    ]
  },
  {
    serverName: "MCHP025A",
    cpuUsage: 12.3,
    usedMemory: 1024,
    totalMemory: 2048,
    services: [
      { name: "GAPortal1", cpu: 25, memory: 40 },
      { name: "GAPortal2", cpu: 10, memory: 15 }
    ]
  },
  {
    serverName: "MCHP029A",
    cpuUsage: 89.9,
    usedMemory: 6144,
    totalMemory: 8192,
    services: [
      { name: "Entrust GetAccess Service", cpu: 25, memory: 40 },
      { name: "Dirx Service", cpu: 10, memory: 15 },
      { name: "Tomcat", cpu: 10, memory: 15 }
    ]
  },
  {
    serverName: "MCHP028A",
    cpuUsage: 45.0,
    usedMemory: 2048,
    totalMemory: 8192,
    services: [
      { name: "Entrust GetAccess Service", cpu: 25, memory: 40 },
      { name: "IIS Service", cpu: 10, memory: 15 },
      { name: "Tomcat", cpu: 10, memory: 15 }
    ]
  },
  {
    serverName: "MCHP028A",
    cpuUsage: 56.5,
    usedMemory: 4096,
    totalMemory: 8192,
    services: [
      { name: "GAPortal1", cpu: 25, memory: 40 },
      { name: "GAPortal2", cpu: 10, memory: 15 }
    ]
  }
];

const CpuMemory = () => {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    setServers(MOCK_DATA.map(server => ({ ...server })));

    const interval = setInterval(() => {
      setServers(prevServers =>
        prevServers.map(server => ({
          ...server,
          cpuUsage: +(Math.random() * 100).toFixed(1),
          usedMemory: Math.floor(Math.random() * server.totalMemory),
          services: (server.services || []).map(service => ({
            ...service,
            cpu: +(Math.random() * 100).toFixed(1),
            memory: +(Math.random() * 100).toFixed(1)
          }))
        }))
      );
    }, 90000); // 90 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="CpuMemory-container">
      <nav className="CpuMemory-nav">
        <div className="CpuMemory-logo">
          <img src={require('../images/logo.png')} alt="Logo" className="CpuMemory-logo-img" />
        </div>
        <div className="CpuMemory-nav-spacer"></div>
      </nav>

      <h1 className="CpuMemory-title">🖥️ Server CPU & Memory Dashboard</h1>

      <main className="CpuMemory-main">
        <div className="CpuMemory-grid">
          {servers.map((server, index) => {
            const memPercent = ((server.usedMemory / server.totalMemory) * 100).toFixed(1);
            return (
              <div key={index} className="CpuMemory-card">
                <h2 className="CpuMemory-card-title">{server.serverName}</h2>
                <ul className="CpuMemory-card-list">
                  <li>
                    <strong>CPU Usage:</strong>{" "}
                    <span className={server.cpuUsage > 80 ? "alert" : "normal"}>
                      {server.cpuUsage}% {server.cpuUsage > 80 && "⚠️"}
                    </span>
                  </li>
                  <li>
                    <strong>Memory Usage:</strong>{" "}
                    <span className={memPercent > 80 ? "alert" : "normal"}>
                      {memPercent}% {memPercent > 80 && "⚠️"}
                    </span>
                  </li>
                </ul>

                {server.services?.length > 0 && (
                  <div className="CpuMemory-services">
                    <strong>Services:</strong>
                    <ul className="CpuMemory-service-list">
                      {server.services.map((svc, i) => (
                        <li key={i} className="CpuMemory-service-item">
                          <span className="CpuMemory-service-name">{svc.name}</span><br />
                          <span className={svc.cpu > 80 ? "alert" : "normal"}>
                            CPU: {svc.cpu}% {svc.cpu > 80 && "⚠️"}
                          </span>{" "}
                          |{" "}
                          <span className={svc.memory > 80 ? "alert" : "normal"}>
                            Memory: {svc.memory}% {svc.memory > 80 && "⚠️"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <footer className="CpuMemory-footer">
        © 2025 Mitel Networks Corporation
      </footer>
    </div>
  );
};

export default CpuMemory;
