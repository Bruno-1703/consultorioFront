import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  
} from '@mui/icons-material';
import MedicationIcon from '@mui/icons-material/Medication';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import { IMenuItem } from '../types';
import { ROUTES } from './routes';

export const MENU_LIST: IMenuItem[] = [
  
  {
    route: ROUTES.main,
    literal: 'Dashboard',
    Icon: DashboardIcon,
  },
  {
    route: ROUTES.citas,
    literal: 'Citas',
    Icon: CalendarMonthIcon,
  },
  {
    route: ROUTES.pacientes,
    literal: 'Pacientes',
    Icon: PersonIcon,
  },
   {
     route: ROUTES.estudios,
     literal: 'Estudios',
     Icon: LibraryBooksIcon,
   },
   {
     route: ROUTES.medicamentos,
     literal: 'Medicamentos',
     Icon: MedicationIcon,
   },
  // {
  //   route: ROUTES.inventory,
  //   literal: 'Inventory',
  //   Icon: AttachMoneyIcon,
  // },
];
