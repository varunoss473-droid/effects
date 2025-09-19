import { CiShoppingCart } from "react-icons/ci";
import { FcSupport } from "react-icons/fc";
import { MdOutlineSupportAgent } from "react-icons/md";

export const menuItems = [
    {
      title: "Products",
      description: "Explore our product range",
      icon: <CiShoppingCart />,
      extraContent: (
        <img
          src={"https://wallpaperaccess.com/full/1385575.jpg"}
          alt="extra-content"
          style={{ width: "100%", height: "100%" }}
        />
      ),
      childrens: [
        {
          name: "Electronics",
          description: "Gadgets and devices",
          icon: <CiShoppingCart />,
          extraContent:  (
            <img
              src={
                "https://tse1.mm.bing.net/th?id=OIP.NVsmHsj4qfjhtdt9u9TRlwHaHa&pid=Api&P=0&h=180"
              }
              alt="extra-content"
              style={{ width: "100%", height: "100%" }}
            />
          ),
          childrens: [
            {
              name: "Phones",
              // url: "/phones",
              icon: <CiShoppingCart />,
              description: "Latest models",
              childrens: [
                {
                  name: "Phones123",
                  url: "/phones",
                  icon: <CiShoppingCart />,
                  description: "Latest models",
                },
                {
                  name: "Laptops3242",
                  url: "/laptops",
                  icon: <CiShoppingCart />,
                  description: "High performance",
                },
                {
                  name: "Phones123",
                  url: "/phones",
                  icon: <CiShoppingCart />,
                  description: "Latest models",
                },
                {
                  name: "Laptops3242",
                  url: "/laptops",
                  icon: <CiShoppingCart />,
                  description: "High performance",
                },
                {
                  name: "Phones123",
                  url: "/phones",
                  icon: <CiShoppingCart />,
                  description: "Latest models",
                },
                {
                  name: "Laptops3242",
                  url: "/laptops",
                  icon: <CiShoppingCart />,
                  description: "High performance",
                },
              ],
            },
            {
              name: "Laptops",
              url: "/laptops",
              icon: <CiShoppingCart />,
              description: "High performance",
            },
            {
              name: "Phones",
              // url: "/phones",
              icon: <CiShoppingCart />,
              description: "Latest models",
              childrens: [
                {
                  name: "Phones123",
                  url: "/phones",
                  icon: <CiShoppingCart />,
                  description: "Latest models",
                },
                {
                  name: "Laptops3242",
                  url: "/laptops",
                  icon: <CiShoppingCart />,
                  description: "High performance",
                },
                {
                  name: "Phones123",
                  url: "/phones",
                  icon: <CiShoppingCart />,
                  description: "Latest models",
                },
                {
                  name: "Laptops3242",
                  url: "/laptops",
                  icon: <CiShoppingCart />,
                  description: "High performance",
                },
                {
                  name: "Phones123",
                  url: "/phones",
                  icon: <CiShoppingCart />,
                  description: "Latest models",
                },
                {
                  name: "Laptops3242",
                  url: "/laptops",
                  icon: <CiShoppingCart />,
                  description: "High performance",
                },
              ],
            },
            {
              name: "Laptops",
              url: "/laptops",
              icon: <CiShoppingCart />,
              description: "High performance",
            },
          ],
        },
        {
          name: "Accessories",
          description: "Various accessories",
          icon: <CiShoppingCart />,
          extraContent: (
            <img
              src={
                "https://www.julieseatsandtreats.com/wp-content/uploads/2020/06/Rainbow-Ice-Cream-14-of-16.jpg"
              }
              alt="extra-content"
              style={{ width: "100%", height: "100%" }}
            />
          ),
          childrens: [
            {
              name: "Chargers",
              url: "/chargers",
              icon: <CiShoppingCart />,
              description: "Fast charging",
            },
          ],
        },
      ],
    },
    {
      title: "Products 2",
      description: "Explore our product range",
      icon: <CiShoppingCart />,
      extraContent: (
        <img
          src={"https://wallpaperaccess.com/full/1385575.jpg"}
          alt="extra-content"
          style={{ width: "100%", height: "100%" }}
        />
      ),
      childrens: [
        {
          name: "Electronics 123",
          description: "Gadgets and devices",
          icon: <CiShoppingCart />,
          extraContent: (
            <img
              src={
                "https://tse1.mm.bing.net/th?id=OIP.NVsmHsj4qfjhtdt9u9TRlwHaHa&pid=Api&P=0&h=180"
              }
              alt="extra-content"
              style={{ width: "100%", height: "100%" }}
            />
          ),
          childrens: [
            {
              name: "Phones 123",
              url: "/phones",
              icon: <CiShoppingCart />,
              description: "Latest models",
              childrens: [
                {
                  name: "Phones123",
                  url: "/phones",
                  icon: <CiShoppingCart />,
                  description: "Latest models",
                },
                {
                  name: "Laptops3242",
                  url: "/laptops",
                  icon: <CiShoppingCart />,
                  description: "High performance",
                },
              ],
            },
            {
              name: "Laptops",
              url: "/laptops",
              icon: <CiShoppingCart />,
              description: "High performance",
            },
          ],
        },
        {
          name: "Accessories 213",
          description: "Various accessories",
          icon: <CiShoppingCart />,
          extraContent: (
            <img
              src={
                "https://www.julieseatsandtreats.com/wp-content/uploads/2020/06/Rainbow-Ice-Cream-14-of-16.jpg"
              }
              alt="extra-content"
              style={{ width: "100%", height: "100%" }}
            />
          ),
          childrens: [
            {
              name: "Chargers 123",
              url: "/chargers",
              icon: <CiShoppingCart />,
              description: "Fast charging",
            },
          ],
        },
      ],
    },
    {
      title: "Support",
      description: "Get help and find answers",
      icon: <MdOutlineSupportAgent />,
      childrens: [
        {
          name: "FAQs",
          url: "/faq",
          icon: <MdOutlineSupportAgent />,
          description: "Common questions",
        },
        {
          name: "Contact",
          url: "/contact",
          icon: <MdOutlineSupportAgent />,
          description: "Reach out to us",
        },
      ],
    },
    {
      title: "Custom",
      description: "Special content",
      icon: <FcSupport />,
      url: "/contact",
      // childrens: (
      //   <div>
      //     <h4>Custom Content</h4>
      //     <p>This is completely custom JSX content.</p>
      //   </div>
      // ),
    },
  ];
  