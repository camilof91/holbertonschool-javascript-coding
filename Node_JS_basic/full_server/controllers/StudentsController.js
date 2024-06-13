const readDatabase = require('../utils');

class StudentsController {
    static getAllStudents(request, response) {
        readDatabase(process.argv[2])
            .then((data) => {
                const printData = [];
                printData.push('This is the list of our students');
                for (const field in data) {
                    if (field) printData.push(`Number of students in ${field}: ${data[field].number}. ${data[field].list}`);
                }
                response.send(printData.join('\n'));
            })
            .catch((err) => { response.send(err.message); });
    }

    static getAllStudentsByMajor(request, response) {
        if (!['SWE', 'CS'].includes(request.params.major)) {
          return response.status(500).send('Major parameter must be CS or SWE');
        }
      
        readDatabase(process.argv[2])
          .then((data) => {
            if (Object.keys(data).length > 0) {
              response.send(data[request.params.major].list);
            } else {
              response.status(500).send('Cannot load the database');
            }
          })
          .catch((err) => {
            // Manejar el error de forma adecuada (por ejemplo, registrar el error)
            console.error(err.message);
            // Considerar lanzar un error para propagarlo más adelante
            throw err;
          });
      }
}

module.exports = StudentsController;
