import { Outlet } from "react-router-dom";

import "./pages-layout.css";
import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import { Box } from "@mui/material";
import BottomMenu from "../bottom-menu/BottomMenu";

function PagesLayout() {
  return (
    <div className="pages-layout">
      <Topbar />
      <span className="mobile-view">
        <Sidebar />
      </span>
      <span className="web-view">
        <BottomMenu />
      </span>

      <Box pt={10} ml={2} mr={2} className="pageMargin">
        <Outlet />
      </Box>
    </div>
  );
}

export default PagesLayout;
