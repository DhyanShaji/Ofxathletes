const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const rootDir = __dirname;

const apiData = {
  site: {
    name: 'OFXATHLETES',
    tagline: 'Train harder. Perform smarter.',
    description:
      'We help athletes improve performance by connecting them with coaches, teams, and training systems built for measurable progress.'
  },
  stats: [
    { label: 'Active athletes', value: '12k+' },
    { label: 'Retention rate', value: '94%' },
    { label: 'Average coach response', value: '48h' }
  ],
  features: [
    {
      title: 'Speed & agility',
      description: 'Explosive training to improve acceleration, footwork, and balance.'
    },
    {
      title: 'Strength coaching',
      description: 'Smart programming designed for power, resilience, and growth.'
    },
    {
      title: 'Performance analytics',
      description: 'Track output, recovery, and movement quality with actionable insights.'
    },
    {
      title: 'Team support',
      description: 'Connect with specialists, trainers, and athletes in one system.'
    }
  ],
  coaches: [
    {
      name: 'Marcus Reid',
      role: 'Head coach',
      bio: 'Former collegiate sprint coach focused on explosive power and race prep.'
    },
    {
      name: 'Leah Morgan',
      role: 'Strength trainer',
      bio: 'Builds resilient, efficient training systems for long-term athletic performance.'
    },
    {
      name: 'Daniel Noor',
      role: 'Recovery lead',
      bio: 'Helps athletes optimize effort, recovery, and consistency for peak performance.'
    }
  ],
  events: [
    {
      title: 'Speed & acceleration clinic',
      type: 'Performance Lab',
      date: '12 APR',
      description: 'Hands-on movement evaluation and sprint mechanics coaching.'
    },
    {
      title: 'High-performance weekend',
      type: 'Championship prep',
      date: '24 APR',
      description: 'Strength, mobility, and competition readiness for in-season athletes.'
    },
    {
      title: 'Tryout & assessment day',
      type: 'Open trial',
      date: '08 MAY',
      description: 'Performance benchmarking and team placement planning.'
    }
  ],
  testimonials: [
    {
      athlete: 'Ariana J.',
      sport: 'Track athlete',
      quote: 'The coaching changed my approach completely. I gained confidence and stronger mechanics.'
    },
    {
      athlete: 'Kenneth M.',
      sport: 'Football player',
      quote: 'The performance tracking kept me accountable and improved both output and recovery.'
    },
    {
      athlete: 'Sofia R.',
      sport: 'Basketball athlete',
      quote: 'The team environment is serious, motivating, and built around progress.'
    }
  ]
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload, null, 2));
}

function serveStaticFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not Found');
      return;
    }

    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  if (url.pathname === '/' || url.pathname === '/index.html') {
    serveStaticFile(res, path.join(rootDir, 'index.html'));
    return;
  }

  if (url.pathname === '/style.css') {
    serveStaticFile(res, path.join(rootDir, 'style.css'));
    return;
  }

  if (url.pathname === '/logo.jpeg') {
    serveStaticFile(res, path.join(rootDir, 'logo.jpeg'));
    return;
  }

  if (url.pathname === '/api' || url.pathname === '/api/') {
    sendJson(res, 200, { message: 'OFXATHLETES API is running', endpoints: ['/api/overview', '/api/features', '/api/coaches', '/api/events', '/api/testimonials'] });
    return;
  }

  if (url.pathname === '/api/overview') {
    sendJson(res, 200, { site: apiData.site, stats: apiData.stats });
    return;
  }

  if (url.pathname === '/api/features') {
    sendJson(res, 200, { features: apiData.features });
    return;
  }

  if (url.pathname === '/api/coaches') {
    sendJson(res, 200, { coaches: apiData.coaches });
    return;
  }

  if (url.pathname === '/api/events') {
    sendJson(res, 200, { events: apiData.events });
    return;
  }

  if (url.pathname === '/api/testimonials') {
    sendJson(res, 200, { testimonials: apiData.testimonials });
    return;
  }

  if (url.pathname === '/api/athletes') {
    sendJson(res, 200, { athletes: apiData.coaches });
    return;
  }

  sendJson(res, 404, { error: 'Endpoint not found' });
});

server.listen(PORT, () => {
  console.log(`OFXATHLETES API running on http://localhost:${PORT}`);
});
