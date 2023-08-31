import React, { useState } from 'react'
import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap'

const EducationForm = () => {
  const [entries, setEntries] = useState([])

  const handleBacklogsChange = (id, value) => {
    setEntries(entries.map((entry) => (entry.id === id ? { ...entry, backlogs: value } : entry)))
  }

  const handleEducationLevelChange = (id, value) => {
    setEntries(
      entries.map((entry) => (entry.id === id ? { ...entry, educationLevel: value } : entry)),
    )
  }

  const generateEntries = (count) => {
    const newEntries = Array.from({ length: count }, (_, id) => ({
      id,
      backlogs: 'no',
      educationLevel: 'post-graduation',
    }))

    setEntries(newEntries)
  }

  const getAvailableEducationLevels = (index) => {
    const selectedLevels = entries
      .filter((entry, i) => i < index && entry.educationLevel)
      .map((entry) => entry.educationLevel)

    return ['post-graduation', 'graduation', 'inter-diploma', 'ssc'].filter(
      (level) => !selectedLevels.includes(level),
    )
  }

  return (
    <Container className="mt-5">
      <h2>Education Details</h2>
      <Form>
        <Button variant="link" onClick={() => generateEntries(4)}>
          Post Graduation
        </Button>
        <Button variant="link" onClick={() => generateEntries(3)}>
          Graduation
        </Button>
        <Button variant="link" onClick={() => generateEntries(2)}>
          Inter/Diploma
        </Button>
        <Button variant="link" onClick={() => generateEntries(1)}>
          SSC
        </Button>

        {entries.map((entry, index) => (
          <Card key={entry.id} className="mb-4 p-3">
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>School/College Name</Form.Label>
                <Form.Control type="text" required />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" required />
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>Level of Education</Form.Label>
                <Form.Control
                  as="select"
                  value={entry.educationLevel || 'post-graduation'}
                  onChange={(e) => handleEducationLevelChange(entry.id, e.target.value)}
                  required
                >
                  {getAvailableEducationLevels(index).map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Backlogs (Including cleared backlogs)</Form.Label>
                <Form.Control
                  as="select"
                  value={entry.backlogs || 'no'}
                  onChange={(e) => handleBacklogsChange(entry.id, e.target.value)}
                  required
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </Form.Control>
              </Col>
            </Row>
            {entry.backlogs === 'yes' && (
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Label>Number of Backlogs</Form.Label>
                  <Form.Control type="number" />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Label>Attempts Given</Form.Label>
                  <Form.Control type="number" />
                </Col>
              </Row>
            )}
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" required />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" required />
              </Col>
            </Row>
          </Card>
        ))}
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default EducationForm
