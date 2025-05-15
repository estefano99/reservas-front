import SidebarLink from "./SidebarLink";

const SidebarNav = ({ links }) => {
  return (
    <nav className="grid items-start px-2 lg:px-4">
      {links.map((link) => {
        const formattedLink = link.title.toLowerCase().replace(/\s/g, "-");
        return (
          <SidebarLink
            key={`${formattedLink}`}
            linkTitle={link.title}
            linkIcon={link.icon}
            redirectTo={formattedLink}
          />
        );
      })}
    </nav>
  );
};

export default SidebarNav;
