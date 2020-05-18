/*
 * @Description: 按需引用ant design vue组件
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-05-07 17:10:38
 * @LastEditTime: 2019-08-29 11:31:13
 */
import Button from 'ant-design-vue/lib/button';
import Switch from 'ant-design-vue/lib/switch';
import Dropdown from 'ant-design-vue/lib/dropdown';
import Menu from 'ant-design-vue/lib/menu';
import Icon from 'ant-design-vue/lib/icon';
import Breadcrumb from 'ant-design-vue/lib/breadcrumb';
import Row from 'ant-design-vue/lib/row';
import Col from 'ant-design-vue/lib/col';
import Pagination from 'ant-design-vue/lib/pagination';
import Checkbox from 'ant-design-vue/lib/checkbox';
import DatePicker from 'ant-design-vue/lib/date-picker';
import Form from 'ant-design-vue/lib/form';
import Input from 'ant-design-vue/lib/input';
import InputNumber from 'ant-design-vue/lib/input-number';
import Select from 'ant-design-vue/lib/select';
import TimePicker from 'ant-design-vue/lib/time-picker';
import Upload from 'ant-design-vue/lib/upload';
import Avatar from 'ant-design-vue/lib/avatar';
import Table from 'ant-design-vue/lib/table';
import Tabs from 'ant-design-vue/lib/tabs';
import Tag from 'ant-design-vue/lib/tag';
import Tooltip from 'ant-design-vue/lib/tooltip';
import Tree from 'ant-design-vue/lib/tree';
import Alert from 'ant-design-vue/lib/alert';
import Modal from 'ant-design-vue/lib/modal';
import Spin from 'ant-design-vue/lib/spin';
import Divider from 'ant-design-vue/lib/divider';
import ConfigProvider from 'ant-design-vue/lib/config-provider';
import LocaleProvider from 'ant-design-vue/lib/locale-provider';
import Badge from 'ant-design-vue/lib/badge';
import Card from 'ant-design-vue/lib/card';
import Slider from 'ant-design-vue/lib/slider';
import Rate from 'ant-design-vue/lib/rate';
import Steps from 'ant-design-vue/lib/steps';
import Radio from 'ant-design-vue/lib/radio';


export default (Vue) => {
  Vue.use(Button);
  Vue.use(Switch);
  Vue.use(Dropdown);
  Vue.use(Menu);
  Vue.use(Icon);
  Vue.use(Breadcrumb);
  Vue.use(Row);
  Vue.use(Col);
  Vue.use(Pagination);
  Vue.use(Checkbox);
  Vue.use(DatePicker);
  Vue.use(Form);
  Vue.use(Input);
  Vue.use(InputNumber);
  Vue.use(Select);
  Vue.use(TimePicker);
  Vue.use(Upload);
  Vue.use(Avatar);
  Vue.use(Table);
  Vue.use(Tabs);
  Vue.use(Tag);
  Vue.use(Tooltip);
  Vue.use(Tree);
  Vue.use(Alert);
  Vue.use(Modal);
  Vue.use(Spin);
  Vue.use(Divider);
  Vue.use(ConfigProvider);
  Vue.use(LocaleProvider);
  Vue.use(Badge);
  Vue.use(Card);
  Vue.use(Slider);
  Vue.use(Rate);
  Vue.use(Steps);
  Vue.use(Radio);
};
