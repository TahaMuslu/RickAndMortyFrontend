import { Button, Col, Result, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <Row style={{ height: "100vh", width: "100vw", marginTop: "10vh" }}>
            <Col offset={8} span={8}>
                <Result
                    status="500"
                    title="500"
                    subTitle={"Sorry, something went wrong."}
                    extra={<Button type="primary"><Link to="/">{"Go to home"}</Link></Button>}
                />
            </Col>
        </Row>
    );
};

export default Error;