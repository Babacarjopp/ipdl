const httpStatus = require('http-status-codes');
const contentTypes = require('../contentTypes');
const utils = require('../utils');
const courses = require('../models/courses');
const fs = require('fs');
const path = require('path');

const coursesFilePath = path.join(__dirname, '..', 'data', 'courses.json');

module.exports = {
  getCourses: (req, res) => {
    utils.getFile("views/courses.html", res);
  },

  getCoursesAPI: (req, res) => {
    res.writeHead(httpStatus.OK, contentTypes.json);
    res.end(JSON.stringify(courses));
  },

  getCourseById: (req, res, id) => {
    const course = courses.find(c => c.id === parseInt(id));
    if (course) {
      res.writeHead(httpStatus.OK, contentTypes.json);
      res.end(JSON.stringify(course));
    } else {
      res.writeHead(httpStatus.NOT_FOUND, contentTypes.json);
      res.end(JSON.stringify({ error: "Cours non trouvé" }));
    }
  },

  searchCourses: (req, res, query) => {
    fs.readFile(coursesFilePath, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.json);
        res.end(JSON.stringify({ error: 'Erreur lors de la lecture des cours.' }));
        return;
      }

      const courses = JSON.parse(data);
      const results = courses.filter(course =>
        course.title.toLowerCase().includes(query.toLowerCase())
      );

      res.writeHead(httpStatus.OK, contentTypes.json);
      res.end(JSON.stringify(results));
    });
  }
};
