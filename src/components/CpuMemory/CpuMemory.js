import { useEffect, useState } from 'react';
import './CpuMemory.css';
import '../images/logo.png';

const MOCK_DATA = [
  {
    serverName: "MCHP021A",
    cpuUsage: 34.5,
    usedMemory: 2048,
    totalMemory: 4096,
  },
  {
    serverName: "MCHP026A",
    cpuUsage: 68.2,
    usedMemory: 3072,
    totalMemory: 4096,
  },
  {
    serverName: "MCHP025A",
    cpuUsage: 12.3,
    usedMemory: 1024,
    totalMemory: 2048,
  },
  {
    serverName: "MCHP029A",
    cpuUsage: 89.9,
    usedMemory: 6144,
    totalMemory: 8192,
  },
  {
    serverName: "MCHP028A",
    cpuUsage: 45.0,
    usedMemory: 2048,
    totalMemory: 8192,
  },
  {
    serverName: "MCHP028A",
    cpuUsage: 56.5,
    usedMemory: 4096,
    totalMemory: 8192,
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
        }))
      );
    }, 90000);

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
        <table className="CpuMemory-table">
          <thead>
            <tr>
              <th>Server Name</th>
              <th>CPU Usage (%)</th>
              <th>Memory Usage (%)</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((server, index) => {
              const memPercent = ((server.usedMemory / server.totalMemory) * 100).toFixed(1);
              return (
                <tr key={index}>
                  <td>{server.serverName}</td>
                  <td className={server.cpuUsage > 80 ? 'alert' : 'normal'}>
                    {server.cpuUsage}% {server.cpuUsage > 80 && '⚠️'}
                  </td>
                  <td className={memPercent > 80 ? 'alert' : 'normal'}>
                    {memPercent}% {memPercent > 80 && '⚠️'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>


      <footer className="CpuMemory-footer">
        © 2025 Mitel Networks Corporation
      </footer>
    </div>
  );
};

export default CpuMemory;
