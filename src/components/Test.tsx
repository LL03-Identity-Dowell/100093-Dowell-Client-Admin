import React, { useState, useEffect } from 'react';

interface Portfolio {
  username: string[];
  member_type: string;
  product: string;
  data_type: string;
  operations_right: string;
  role: string;
  security_layer: string;
  portfolio_name: string;
  portfolio_code: string;
  portfolio_specification: string;
  portfolio_uni_code: string;
  portfolio_details: string;
  status: string;
}

interface UserManagement {
  [key: string]: {
    rights: string;
    portfolios: Portfolio[];
  };
}

const RightsSelector: React.FC = () => {
  const portfoliosList: Portfolio[] = [
    {
      username: ['user1', 'user2'],
      member_type: 'Member Type 1',
      product: 'Product 1',
      data_type: 'Data Type 1',
      operations_right: 'Operation Right 1',
      role: 'Role 1',
      security_layer: 'Security Layer 1',
      portfolio_name: 'Portfolio Name 1',
      portfolio_code: 'Code 1',
      portfolio_specification: 'Specification 1',
      portfolio_uni_code: 'Uni Code 1',
      portfolio_details: 'Details 1',
      status: 'Active',
    },
    {
      username: ['user3', 'user4'],
      member_type: 'Member Type 2',
      product: 'Product 2',
      data_type: 'Data Type 2',
      operations_right: 'Operation Right 2',
      role: 'Role 2',
      security_layer: 'Security Layer 2',
      portfolio_name: 'Portfolio Name 2',
      portfolio_code: 'Code 2',
      portfolio_specification: 'Specification 2',
      portfolio_uni_code: 'Uni Code 2',
      portfolio_details: 'Details 2',
      status: 'Inactive',
    },
    // ... Add more portfolios as needed
  ];

  const initialArrayOfObjects: UserManagement[] = [
    {
      'user Management 1': {
        rights: 'View',
        portfolios: [portfoliosList[0], portfoliosList[1]]
      }
    },
    {
      'user Management 2': {
        rights: 'Add/Edit',
        portfolios: [portfoliosList[2], portfoliosList[3]]
      }
    },
    {
      'user Management 3': {
        rights: 'View',
        portfolios: [portfoliosList[4], portfoliosList[5]]
      }
    }
    // ... Add more user managements with portfolios
  ];
  const AnotherUserManagement: UserManagement[] = [
    {
      'user Management 4': {
        rights: 'View',
        portfolios: [portfoliosList[6], portfoliosList[7]] // Adjust portfolios as needed
      }
    },
    {
      'user Management 5': {
        rights: 'Add/Edit',
        portfolios: [portfoliosList[8], portfoliosList[9]] // Adjust portfolios as needed
      }
    },
    // Add more user management data if required, including potential duplicates
    {
      'user Management 4': {
        rights: 'Add/Edit', // Updated rights for 'user Management 4'
        portfolios: [portfoliosList[10], portfoliosList[11]] // Updated portfolios for 'user Management 4'
      }
    }
  ];
  const mergedArrayOfObjects = (): UserManagement[] => {
    const updatedArray: UserManagement[] = [];
    initialArrayOfObjects.forEach(obj => updatedArray.push({ ...obj }));
    AnotherUserManagement.forEach(obj => {
      const key = Object.keys(obj)[0];
      const index = updatedArray.findIndex(item => Object.keys(item)[0] === key);
      if (index !== -1) {
        updatedArray[index][key] = obj[key];
      } else {
        updatedArray.push(obj);
      }
    });
    return updatedArray;
  };

  const [arrayOfObjects, setArrayOfObjects] = useState<UserManagement[]>(mergedArrayOfObjects);
  const [selectedOption, setSelectedOption] = useState<string>(Object.keys(initialArrayOfObjects[0])[0]);
  const [selectedRights, setSelectedRights] = useState<string>('');
  const [selectedPortfolios, setSelectedPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    const selectedObject = arrayOfObjects.find(obj => Object.keys(obj)[0] === selectedOption);
    if (selectedObject) {
      setSelectedRights(selectedObject[selectedOption].rights);
      setSelectedPortfolios(selectedObject[selectedOption].portfolios);
    }
  }, [selectedOption, arrayOfObjects]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  const handleRightsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRightsValue = event.target.value;
    setSelectedRights(newRightsValue);

    const updatedArrayOfObjects = arrayOfObjects.map(obj => {
      const key = Object.keys(obj)[0];
      if (key === selectedOption) {
        return {
          [key]: {
            ...obj[key],
            rights: newRightsValue
          }
        };
      }
      return obj;
    });

    setArrayOfObjects(updatedArrayOfObjects);
  };

  const handlePortfoliosChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPortfolioCodes = Array.from(event.target.selectedOptions, option => option.value);
    const selectedPortfolios = portfoliosList.filter(portfolio => selectedPortfolioCodes.includes(portfolio.portfolio_code));
    setSelectedPortfolios(selectedPortfolios);

    const updatedArrayOfObjects = arrayOfObjects.map(obj => {
      const key = Object.keys(obj)[0];
      if (key === selectedOption) {
        return {
          [key]: {
            ...obj[key],
            portfolios: selectedPortfolios
          }
        };
      }
      return obj;
    });

    setArrayOfObjects(updatedArrayOfObjects);
  };

  return (
    <div>
      <label htmlFor="userManagementSelect">Select User Management:</label>
      <select id="userManagementSelect" value={selectedOption} onChange={handleSelectChange}>
        {arrayOfObjects.map(obj => (
          <option key={Object.keys(obj)[0]} value={Object.keys(obj)[0]}>
            {Object.keys(obj)[0]}
          </option>
        ))}
      </select>

      <label htmlFor="rightsSelect">Select Rights:</label>
      <select id="rightsSelect" value={selectedRights} onChange={handleRightsChange}>
        <option value="View">View</option>
        <option value="Add/Edit">Add/Edit</option>
      </select>

      <p>Rights: {selectedRights}</p>

      <label htmlFor="portfoliosSelect">Select Portfolios:</label>
      <select
        id="portfoliosSelect"
        multiple
        value={selectedPortfolios.map(portfolio => portfolio.portfolio_code)}
        onChange={handlePortfoliosChange}
      >
        {portfoliosList.map((portfolio, index) => (
          <option key={index} value={portfolio.portfolio_code}>
            {portfolio.portfolio_name}
          </option>
        ))}
      </select>

      <p>Selected Portfolios:</p>
      <ul>
        {selectedPortfolios.map((portfolio, index) => (
          <li key={index}>{portfolio.portfolio_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RightsSelector;
