import { lazy, Suspense } from "react";
import { Layout, Menu, Spin } from "antd";
import {
  AliwangwangOutlined,
  AuditOutlined,
  CommentOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  DiffOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store/store";
import { setActiveView, setActiveChatSub, setShowInitial, toggleSidebar,setOpenKeys } from "./store/slices/appSlice";
import Logo from "./assets/images/logo.png";
import Logo1 from "./assets/images/logo1.png";

// Lazy load pages
const Chat = lazy(() => import("./pages/Chat"));
const Initial = lazy(() => import("./pages/Initial"));
const Database = lazy(() => import("./pages/Database"));
const TrainingData = lazy(() => import("./pages/TrainingData"));
const KnowledgeBase = lazy(() => import("./pages/KnowledgeBase"));
const Feedback = lazy(() => import("./pages/Feedback"));


const { Sider, Content } = Layout;

const App = () => {
  const dispatch = useDispatch();
  const { collapsed, activeView, activeChatSub, showInitial,openKeys } = useSelector(
    (state: RootState) => state.app
  );

  const handleMenuClick = ({ key, keyPath }: any) => {
    dispatch(setShowInitial(false));
    if (keyPath.includes("chat")) {
      dispatch(setActiveView("chat"));
      dispatch(setActiveChatSub(key));
    } else {
      dispatch(setActiveView(key));
    }
  };

  const handleOpenChange = (openKeys: string[]) => {
    dispatch(setOpenKeys(openKeys));
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => dispatch(toggleSidebar())}
        style={{ backgroundColor: "white" }}
      >
        <div className="p-4 text-center bg-white">
          <img src={collapsed ? Logo1 : Logo} alt="Logo" className="w-28 mx-auto" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={showInitial ? [] : [activeView === "chat" ? activeChatSub : activeView]}
          openKeys={openKeys}
          onOpenChange={handleOpenChange}
          onClick={handleMenuClick}
        >
          <Menu.SubMenu key="chat" icon={<CommentOutlined />} title="Chat">
            <Menu.Item key="patent" icon={<AliwangwangOutlined />}>
              Patent Chat
            </Menu.Item>
            <Menu.Item key="process" icon={<AuditOutlined />}>
              Process Chat
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="database" icon={<DatabaseOutlined />}>
            Database
          </Menu.Item>
          <Menu.Item key="knowledgeBase" icon={<DiffOutlined />}>
            Knowledge Base
          </Menu.Item>
          <Menu.Item key="trainingData" icon={<FormOutlined />}>
            Training Data
          </Menu.Item>
          <Menu.Item key="feedback" icon={<DeploymentUnitOutlined />}>
            Feedback
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content>
          <Suspense fallback={<div className="flex items-center justify-center h-screen"><Spin size="large" /></div>}>
            {showInitial ? (
              <Initial
                onSelect={(view, sub) => {
                  dispatch(setActiveView(view));
                  if (view === "chat" && sub) {
                    dispatch(setActiveChatSub(sub));
                  }
                  dispatch(setShowInitial(false));
                }}
              />
            ) : activeView === "chat" ? (
              <Chat activeSub={activeChatSub} />
            ) : activeView === "database" ? (
              <Database />
            ) : activeView === "knowledgeBase" ? (
              <KnowledgeBase />
            ) : activeView === "feedback" ? (
              <Feedback />
            ) : activeView === "trainingData" ? (
              <TrainingData />
            ) : null}
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
