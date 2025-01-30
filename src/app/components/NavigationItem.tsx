import { IconType } from 'react-icons';

interface NavigationItemProps {
  icon: IconType;
  label: string;
}

const NavigationItem: React.FC<NavigationItemProps> = ({ icon: Icon, label }) => {
  return (
    <li className="flex items-center p-4 hover:bg-gray-700">
      <Icon className="mr-4" />
      {label}
    </li>
  );
};

export default NavigationItem;
