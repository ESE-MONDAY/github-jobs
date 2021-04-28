import React, {useState} from 'react';
import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

export default function Job({job}) {
    const [open, setOpen] = useState(false)
    return (
        <Card className= 'mb-3'>
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                       <Card.Title>
                    {job.title} - <span className= 'text-muted font-weight-light'>{job.company}</span>
                </Card.Title> 
                <Card.Subtitle className= 'mb-2 text-muted'>
                    {new Date(job.created_at).toLocaleDateString()}
                </Card.Subtitle>
                <Badge className='mr-2' variant= 'secondary'>{job.type}</Badge>
                <Badge className='mr-2' variant= 'secondary'>{job.location}</Badge>
                <div >
                <ReactMarkdown source={job.how_to_apply}></ReactMarkdown>

                </div>
                    </div>
                  <div>
                    <img className= 'd-none d-md-block' height= '50' src={job.company_logo} alt= {job.company} />
                </div>  
                </div>
                <Card.Text>
                    <Button onClick={() =>
                        setOpen(prevOpen => !prevOpen)
                    }
                     className='mt-2' variant= 'primary'>{open ?'Hide Details'  : 'View Details'}</Button>
                </Card.Text>
                <div>
                    <Collapse in={open}>
                    <ReactMarkdown source={job.description} />
                    </Collapse>
                    
                </div>
                
            </Card.Body>
        </Card>
    )
}


