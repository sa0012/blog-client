import Vue from 'vue'
// import Element from 'element-ui/lib/element-ui.common'
// import locale from 'element-ui/lib/locale/lang/en'
import {
  Pagination,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Popover,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tag,
  Tooltip,
  Alert,
  Icon,
  Row,
  Col,
  Upload,
  Carousel,
  CarouselItem,
  Message,
} from 'element-ui';
export default () => {

  Vue.use(Pagination);
  Vue.use(Dropdown);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
  Vue.use(Menu);
  Vue.use(Submenu);
  Vue.use(MenuItem);
  Vue.use(MenuItemGroup);
  Vue.use(Input);
  Vue.use(Select);
  Vue.use(Option);
  Vue.use(OptionGroup);
  Vue.use(Button);
  Vue.use(ButtonGroup);
  Vue.use(Popover);
  Vue.use(Breadcrumb);
  Vue.use(BreadcrumbItem);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Tag);
  Vue.use(Tooltip);
  Vue.use(Alert);
  Vue.use(Icon);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Upload);
  Vue.use(Carousel);
  Vue.use(CarouselItem);

  Vue.prototype.$message = Message;
  // Vue.use({ locale })
}
