import React from 'react';
import { Accordion, Card, Button } from 'react-bootstrap';
import Category from './Category.jsx';
import Location from './Location.jsx';
import Cost from './Cost.jsx';
import PrivateOrPublic from './PrivateOrPublic.jsx';
import NumberOfPeople from './NumberOfPeople.jsx';

const Filter = ({ handleFilterCityChange, filterCityValue, handleFilterStateChange, filterStateValue }) => (
  <div className="filter-container">
    <h3>Filter Results DAWG</h3>
    <Accordion>
      <Card style={{
        backgroundColor: 'white', color: 'blue', width: '100%', borderRadius: 0,
      }}
      >
        <Card.Header>
          <Accordion.Toggle as={Button} variant={Card.Header} eventKey="0">
            Location
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Location
              handleFilterCityChange={handleFilterCityChange}
              filterCityValue={filterCityValue}
              handleFilterStateChange={handleFilterStateChange}
              filterStateValue={filterStateValue}
            />
          </Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant={Card.Header} eventKey="1">
            Category
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body><Category /></Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant={Card.Header} eventKey="2">
            # Attending
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="2">
          <Card.Body><NumberOfPeople /></Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant={Card.Header} eventKey="3">
            Cost
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="3">
          <Card.Body><Cost /></Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant={Card.Header} eventKey="4">
            Public/Private
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="4">
          <Card.Body><PrivateOrPublic /></Card.Body>
        </Accordion.Collapse>
      </Card>

      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant={Card.Header} eventKey="5">
            Time
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="5">
          <Card.Body>This should maybe be a check box or an input for time or something</Card.Body>
        </Accordion.Collapse>
      </Card>

    </Accordion>
  </div>
);

export default Filter;
