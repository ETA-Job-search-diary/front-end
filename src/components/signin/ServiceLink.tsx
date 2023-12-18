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
      className="flex w-full items-center gap-3 border-b border-black100 p-5"
    >
      <Icon
        name="message"
        className="h-4 w-5 stroke-black300 web:h-4 web:w-5"
      />
      <span className="text-1 text-black900">{label}</span>
    </Link>
  );
};

export default ServiceLink;
