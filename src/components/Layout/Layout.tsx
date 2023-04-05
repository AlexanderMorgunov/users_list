import { FC } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout as AntLayout, Menu, theme, Row } from "antd";
import "./Layout.css";

const { Header, Footer } = AntLayout;

const Layout: FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const goHome = () => navigate("/", { replace: true });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntLayout>
      <Header>
        <Row justify="end">
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item onClick={goBack} key={1}>
              Назад
            </Menu.Item>
            <Menu.Item onClick={goHome} key={2}>
              На главную
            </Menu.Item>
          </Menu>
        </Row>
      </Header>
      <main className="site-layout" style={{ padding: "0 50px" }}>
        <Outlet />
      </main>

      <Footer style={{ textAlign: "center" }}>
        {" "}
        ©2023 Created by Morgunov Alex
      </Footer>
    </AntLayout>
  );
};

export default Layout;
