import { Button, Col, Result, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Error = () => {
    const { t } = useTranslation();
    return (
        <Row style={{ height: "100vh", width: "100vw", marginTop: "10vh" }}>
            <Col offset={8} span={8}>
                <Result
                    status="500"
                    title="500"
                    subTitle={t("ERROR.TEXT")}
                    extra={<Button type="primary"><Link to="/">{t("ERROR.BUTTON")}</Link></Button>}
                />
            </Col>
        </Row>
    );
};

export default Error;