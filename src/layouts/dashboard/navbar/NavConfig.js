// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'VEHICLE LOANS',
    items: [
      { title: 'Dashboard', path: '/beneficiary/home', icon: ICONS.dashboard },
      { title: 'Payment Schedule', path: '/beneficiary/plans', icon: ICONS.ecommerce },
      { title: 'Transaction History', path: '/beneficiary/history', icon: ICONS.analytics },
      { title: 'Your Account', path: '/beneficiary/account', icon: ICONS.user },
    ],
  },
];

export default sidebarConfig;
