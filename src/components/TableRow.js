// @flow
import * as React from 'react';
import { Link } from 'react-router-dom';

const TableRow = ({survey}:Object) =>(
      <tr>
        <td>{survey.id}</td>
        <td>{survey.title}</td>
        <td>{survey.tagline}</td>
        <td><Link to={`${survey.id}`}><button type="button" className="btn btn-primary">Details</button></Link></td>
      </tr>
    );
export default TableRow;
