import { useEffect, useState } from 'react';
import './CpuMemory.css'; // Import external CSS

const MOCK_DATA = [
  {
    serverName: "MCHP021A",
    cpuUsage: 34.5,
    usedMemory: 2048,
    totalMemory: 4096,
    services: [
      { name: "Tomcat", cpu: 25, memory: 40 },
      { name: "###", cpu: 10, memory: 15 }
    ]
  },
  // ... other server data
];

const Dashboard = () => {
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
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="dashboard-nav-spacer"></div>
      </nav>

      <h1 className="dashboard-title">🖥️ Server CPU & Memory Dashboard</h1>

      <main className="dashboard-main">
        <div className="dashboard-grid">
          {servers.map((server, index) => {
            const memPercent = ((server.usedMemory / server.totalMemory) * 100).toFixed(1);
            return (
              <div key={index} className="dashboard-card">
                <h2 className="dashboard-card-title">{server.serverName}</h2>
                <ul className="dashboard-card-list">
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
                  <div className="dashboard-services">
                    <strong>Services:</strong>
                    <ul className="dashboard-service-list">
                      {server.services.map((svc, i) => (
                        <li key={i} className="dashboard-service-item">
                          <span className="dashboard-service-name">{svc.name}</span><br />
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

      <footer className="dashboard-footer">
        © ******************************
      </footer>
    </div>
  );
};

export default Dashboard;
