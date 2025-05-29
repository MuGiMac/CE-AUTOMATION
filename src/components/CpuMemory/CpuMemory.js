import { useEffect, useState } from 'react';
import './CpuMemory.css';
import '../images/logo.png';
import { Link } from 'react-router-dom';

const INTEGRATION_SERVERS = ['MCHP021A', 'MCHP026A', 'MCHP025A'];
const PRODUCTION_SERVERS = ['MCHP029A', 'MCHP028A', 'MCHP027A'];

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

const exportToExcel = () => { };

const CpuMemory = () => {
  const [servers, setServers] = useState([]);
  const [serverFilter, setServerFilter] = useState('both');

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
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleFilterChange = (e) => {
    setServerFilter(e.target.value);
  };

  const filteredServers = servers.filter(server => {
    if (serverFilter === 'integration') return INTEGRATION_SERVERS.includes(server.serverName);
    if (serverFilter === 'production') return PRODUCTION_SERVERS.includes(server.serverName);
    return true;
  });

  return (
    <div className="CpuMemory-container">
      <nav className="CpuMemory-nav">
        <div className="CpuMemory-logo">
          <Link to="/menu">
           <img src={require('../images/logo.png')} alt="Logo" className="CpuMemory-logo-img" />
          </Link>
        </div>
        <div className="CpuMemory-nav-spacer"></div>
      </nav>

      <div className="header-row-CpuMemory">
        <label htmlFor="serverFilter" className="serverFilter-label-CpuMemory">Filter By Server Type :</label>
        <select
          id="serverFilter"
          value={serverFilter}
          onChange={handleFilterChange}
          className="serverFilter-CpuMemory"
        >
          <option value="both">Both</option>
          <option value="integration">Integration</option>
          <option value="production">Production</option>
        </select>

        <h1 className="CpuMemory-title">🖥️ Server CPU & Memory Dashboard</h1>
        <button onClick={exportToExcel} className="export-button-CpuMemory">
          Export
        </button>
      </div>

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
            {filteredServers.map((server, index) => {
              const memPercent = ((server.usedMemory / server.totalMemory) * 100).toFixed(1);
              let rowClass = '';
              if (INTEGRATION_SERVERS.includes(server.serverName)) {
                rowClass = 'highlight-green-CpuMemory';
              } else if (PRODUCTION_SERVERS.includes(server.serverName)) {
                rowClass = 'highlight-red-CpuMemory';
              }

              return (
                <tr key={index} className={rowClass}>
                  <td>{server.serverName}</td>
                  <td className={server.cpuUsage > 80 ? 'alert-CpuMemory' : 'normal-CpuMemory'}>
                    {server.cpuUsage}% {server.cpuUsage > 80 && '⚠️'}
                  </td>
                  <td className={memPercent > 80 ? 'alert-CpuMemory' : 'normal-CpuMemory'}>
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
