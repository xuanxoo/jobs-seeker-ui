const express = require('express');
const http = require('http');

const app = express();

const port = 3000;
const autocompleteBaseUrl = 'http://gd.geobytes.com/AutoCompleteCity?callback=?&filter=DE&q=';

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const categories = [
  { id: 12, attributes: { results: 4440, name: 'IT and telecommunication' } },
  { id: 13, attributes: { results: 1979, name: 'Finance and accounting' } },
  { id: 15, attributes: { results: 2130, name: 'Health, medical and social' } },
  { id: 17, attributes: { results: 3262, name: 'Sales and commerce' } },
  {
    id: 18,
    attributes: { results: 2586, name: 'Production, construction and trade' },
  },
  {
    id: 19,
    attributes: {
      results: 1982,
      name: 'Management / executive and strategic management',
    },
  },
  { id: 21, attributes: { results: 1468, name: 'Not categorized' } },
  { id: 22, attributes: { results: 2652, name: 'Engineering / technical' } },
  {
    id: 23,
    attributes: {
      results: 1432,
      name: 'Banking, insurance and financial services',
    },
  },
  {
    id: 25,
    attributes: { results: 719, name: 'Purchasing, transport and logistics' },
  },
  { id: 26, attributes: { results: 1304, name: 'Marketing and advertising' } },
  { id: 27, attributes: { results: 547, name: 'Training / instruction' } },
  { id: 39, attributes: { results: 1439, name: 'Administration' } },
  { id: 48, attributes: { results: 3440, name: 'IT consulting' } },
  { id: 49, attributes: { results: 1934, name: 'Government consulting' } },
  { id: 51, attributes: { results: 2842, name: 'Textile industry' } },
  { id: 54, attributes: { results: 986, name: 'Public services administration' } },
  { id: 1999, attributes: { results: 3636, name: 'Other' } },
];

// option A we leave the categories like this and see if they reorder them and how to match the picture or on any other criteria
// option B we nest with different levels/attribute names the `name` of the category to see how they traverse a complex object to standardize the information within it to display it

app.get('/categories', (req, res) => {
  console.log('Starting request to categories service');

  res.json(categories);
});

app.param('query', (req, res, next, query) => {
  req.params.query = query;

  next();
});

app.get('/autocomplete/city/:query', async (req, res) => {
  console.log('Starting request to autocompletion service');

  const query = req.params.query;

  const autocompletePromise = new Promise((resolve, reject) => {
    const autocompleteRequest = http.get(`${autocompleteBaseUrl}${query}`, (autocompleteResponse) => {
      autocompleteResponse.on('data', (data) => {
        console.log('Request done!');
        //I have modified this response to manage a buffer because since 2022/08/16 stop working
        let bufferOriginal = Buffer.from(data);
        resolve(bufferOriginal.toString('utf8'));
      });

      autocompleteRequest.on('error', (error) => {
        reject();
      });

      autocompleteRequest.end();
    });
  });

  const result = await autocompletePromise;

  res.send(result);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
