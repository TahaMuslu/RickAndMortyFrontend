import { Button, Col, Result, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const { t } = useTranslation();
    return (
        <Row style={{ height: "100vh", width: "100vw", marginTop: "10vh" }}>
            <Col offset={8} span={8}>
                <Result
                    status="404"
                    title="404"
                    subTitle={t("NOT_FOUND.TITLE")}
                    extra={<Button type="primary"><Link to="/">{t("NOT_FOUND.BUTTON")}</Link></Button>}
                />
            </Col>
        </Row>
    );
};

export default NotFound;