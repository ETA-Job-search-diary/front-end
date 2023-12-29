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
      className="flex w-full items-center gap-3 px-3 py-5"
    >
      <Icon
        name="message"
        className="stroke-black-300 h-4 w-5 web:h-4 web:w-5"
      />
      <span className="text-black-900 text-1">{label}</span>
    </Link>
  );
};

export default ServiceLink;
