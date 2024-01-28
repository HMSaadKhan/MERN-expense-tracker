import { routes } from "./../../common/routes";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
export const appControl = [
  {
    id: 0,
    title: "Records",
    path: routes.expenses,
    icon: <RequestQuoteIcon />,
  },
  { id: 1, title: "Graphs", path: routes.graphs, icon: <BarChartIcon /> },
  {
    id: 2,
    title: "Profile",
    path: routes.updatePassword,
    icon: <PersonIcon />,
  },
  {
    id: 3,
    title: "Category",
    path: routes.category,
    icon: <CategoryIcon />,
  },
];
