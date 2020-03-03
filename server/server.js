const app = require('./serverApp');

const Port = 3000;

app.listen(Port, () => {
  console.log(`listening on port ${Port}`);
});
