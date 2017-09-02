const PROTOCOL = 'http';
const HOST = 'localhost';
const PORT = '8000';

export default {
  url: path => `${PROTOCOL}://${HOST}:${PORT}${path}`
}
