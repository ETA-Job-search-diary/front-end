import Icon from '@/assets/Icon';
import Link from 'next/link';

interface ServiceLinkProps {
  href: string;
  label: string;
}

const ServiceLink = ({ href, label }: ServiceLinkProps) => {
  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="w-full flex items-center gap-3 p-5 border-b border-black100"
    >
      <Icon
        name="message"
        className="w-5 h-4 web:w-5 web:h-4 stroke-black300"
      />
      <span className="text-xs text-black900">{label}</span>
    </Link>
  );
};

export default ServiceLink;
