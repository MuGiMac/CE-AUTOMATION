import React, { useEffect, useState } from 'react';

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
  {
    serverName: "MCHP029A",
    cpuUsage: 68.2,
    usedMemory: 3072,
    totalMemory: 4096,
    services: [
      { name: "Tomcat", cpu: 25, memory: 40 },
      { name: "###", cpu: 10, memory: 15 }
    ]
  },
  {
    serverName: "MCHP025A",
    cpuUsage: 12.3,
    usedMemory: 1024,
    totalMemory: 2048,
    services: [
      { name: "Tomcat", cpu: 25, memory: 40 },
      { name: "###", cpu: 10, memory: 15 }
    ]
  },
  {
    serverName: "MCHP027A",
    cpuUsage: 89.9,
    usedMemory: 6144,
    totalMemory: 8192,
    services: [
      { name: "Tomcat", cpu: 25, memory: 40 },
      { name: "###", cpu: 10, memory: 15 }
    ]
  },
  {
    serverName: "MCHP026A",
    cpuUsage: 45.0,
    usedMemory: 2048,
    totalMemory: 8192,
    services: [
      { name: "Tomcat", cpu: 25, memory: 40 },
      { name: "###", cpu: 10, memory: 15 }
    ]
  },
  {
    serverName: "MCHP028A",
    cpuUsage: 56.5,
    usedMemory: 4096,
    totalMemory: 8192,
    services: [
      { name: "Tomcat", cpu: 25, memory: 40 },
      { name: "###", cpu: 10, memory: 15 }
    ]
  }
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
    <div style={{ padding: '20px' }}>

     <nav style={{
        backgroundColor: 'navy',
        padding: '12px 20px',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
      }}>
        <div style={{ height: '30px' }}></div>
      </nav>
        <h1 style={{ textAlign: 'center'}}>🖥️ Server CPU & Memory Dashboard</h1>
     
      <main style={{ flex: 1, padding: '20px', backgroundColor: '#f4f4f4' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          {servers.map((server, index) => {
            const memPercent = ((server.usedMemory / server.totalMemory) * 100).toFixed(1);
            return (
              <div
                key={index}
                style={{
                  marginBottom: '20px',
                  padding: '16px',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  fontFamily: 'Arial, sans-serif',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                }}
              >
                <h2 style={{ marginBottom: '10px', color: '#333' }}>{server.serverName}</h2>
                <ul style={{ marginLeft: '20px' }}>
                  <li>
                    <strong>CPU Usage:</strong>{' '}
                    <span style={{ color: server.cpuUsage > 80 ? 'red' : 'green' }}>
                      {server.cpuUsage}% {server.cpuUsage > 80 && '⚠️'}
                    </span>
                  </li>
                  <li>
                    <strong>Memory Usage:</strong>{' '}
                    <span style={{ color: memPercent > 80 ? 'red' : 'green' }}>
                      {memPercent}% {memPercent > 80 && '⚠️'}
                    </span>
                  </li>
                </ul>

                {/* Services */}
                {server.services && server.services.length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    <strong>Services:</strong>
                    <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                      {server.services.map((svc, i) => (
                        <li key={i} style={{ margin: '8px 0' }}>
                          <span style={{ fontWeight: 500 }}>{svc.name}</span>
                          <br />
                          <span style={{ color: svc.cpu > 80 ? 'red' : 'green' }}>
                            CPU: {svc.cpu}% {svc.cpu > 80 && '⚠️'}
                          </span>{' '}
                          |{' '}
                          <span style={{ color: svc.memory > 80 ? 'red' : 'green' }}>
                            Memory: {svc.memory}% {svc.memory > 80 && '⚠️'}
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

      <footer style={{ backgroundColor: 'navy', color: 'white', textAlign: 'center', padding: '10px' }}>
        © ******************************
      </footer>
    </div>
  );
};

export default Dashboard;
