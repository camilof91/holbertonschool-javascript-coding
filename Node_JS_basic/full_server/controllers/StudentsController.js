const { readDatabase } = require('../utils');

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const studentData = await readDatabase('database.csv'); // Replace with actual path

      const output = ['This is the list of our students'];
      for (const field in studentData) {
        const students = studentData[field];
        students.sort(); // Sort first names alphabetically (case-insensitive)
        output.push(`Number of students in ${field}: ${students.length}. List: ${students.join(', ')}`);
      }

      res.status(200).send(output.join('\n'));
    } catch (error) {
      console.error(error);
      res.status(500).send('Cannot load the database');
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const { major } = req.params;

    if (!['CS', 'SWE'].includes(major.toUpperCase())) {
      return res.status(500).send('Major parameter must be CS or SWE');
    }

    try {
      const studentData = await readDatabase('database.csv'); // Replace with actual path
      const students = studentData[major.toUpperCase()] || [];
      students.sort();

      res.status(200).send(`List: ${students.join(', ')}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Cannot load the database');
    }
  }
}

module.exports = StudentsController;
