import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'Asset Management',
      type: 'header'
    },
    {
      title: 'Asset Dashboard',
      icon: 'fa fa-book',
      active: false,
      type: 'simple',
      url:'./asset-dashboard'
    },
    {
      title: 'Item Master',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Group Master',
          url:'group-master'
        },
        {
          title: 'Category Master',
          url:'category-master'
        },
        {
          title: 'Parameter Master',
          url:'parameter-master'
        }
      ]
    },
    {
      title: 'Store & Vendor Master',
      icon: 'fa fa-shopping-cart',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Store Master',
          url:'store-master'
        },
        {
          title: 'Vendor Master',
          url:'vendor-master'
        }
      ]
    },
    {
      title: 'Manage Items',
      icon: 'far fa-gem',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Item Registration',
          url:'item-registration'
        },
        {
          title: 'Item Issue/Return',
          url:'item-issue-return'
        },
        {
          title: 'Item Transfer',
          url:'item-transfer'
        },
        {
          title: 'Item Repair Issue/Return',
          url:'item-repair-issue-return'
        },
        {
          title: 'Item Scrap/Donated',
          url:'item-scrap-donated'
        }
      ]
    },
    {
      title: 'HRMS',
      type: 'header'
    },
    {
      title: 'HRMS Dashboard',
      icon: 'fa fa-book',
      active: false,
      type: 'simple',
      url:'./hrms-dashboard'
    },
    {
      title: 'Masters',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Organization Register',
          url:'organization-register'
        },
        {
          title: 'Employee Register',
          url:'employee-register'
        },
        {
          title: 'Employee List',
          url:'employee-list'
        },
        {
          title: 'Company Register',
          url:'company-register'
        },
        {
          title: 'Branch Registration',
          url:'branch-registration'
        },
        {
          title: 'Department Registration',
          url:'department-registration'
        },
        {
          title: 'Designation Register',
          url:'designation-register'
        },
        {
          title: 'Bank Register',
          url:'bank-register'
        }
      ]
    },
    {
      title: 'AMCU',
      type: 'header'
    },
    {
      title: 'AMCU Dashboard',
      icon: 'fa fa-book',
      active: false,
      type: 'simple',
      url:'./amcu-dashboard'
    },
    {
      title: 'Masters',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Route Registration',
          url:'route-registration'
        },
        {
          title: 'Village Registration',
          url:'village-registration'
        },
        {
          title: 'Company Account Registration',
          url:'company-account-registration'
        },
        {
          title: 'Customer Registration',
          url:'customer-registration'
        },
        {
          title: 'Material Registration',
          url:'material-registration'
        },
        {
          title: 'employee Registration',
          url:'employee-registration'
        }       
      ]
    },
    {
      title: 'Rate Card',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Rate Card',
          url:'rate-card'
        },
        {
          title: 'Rate Chart Registration',
          url:'rate-chart-registration'
        },
        {
          title: 'Default Rate Card Assignment',
          url:'default-ratecard-assignment'
        },
        {
          title: 'Additions / Deductions Type',
          url:'additions-deductions-type'
        },
        {
          title: 'Additions Deductions Charges',
          url:'additions-deductions-charges'
        }     
      ]
    },
    {
      title: 'Milk Collection',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Daily Transaction',
          url:'daily-transaction'
        },
        {
          title: 'Milk Collection List',
          url:'milk-collection-list'
        },
        {
          title: 'Doc Milk Collection',
          url:'doc-milk-collection'
        }   
      ]
    },
    {
      title: 'Milk Billing',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Milk Purchase Bill',
          url:'milk-purchase-bill'
        },
        {
          title: 'Bulk Bill Calculation',
          url:'bulk-bill-calculation'
        },
        {
          title: 'Delete All Bills',
          url:'delete-all-bills'
        }   
      ]
    },
    {
      title: 'Inventory',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Purchase Order',
          url:'purchase-order'
        },
        {
          title: 'Goods Receipt Number',
          url:'goods-receipt-number'
        },
        {
          title: 'Purchase Invoice',
          url:'purchase-invoice'
        },
        {
          title: 'Sales Invoice',
          url:'sales-invoice'
        },
        {
          title: 'Debit Note',
          url:'debit-note'
        },
        {
          title: 'Credit Note',
          url:'credit-note'
        },
        {
          title: 'Stock Transfer',
          url:'stock-transfer'
        }  
      ]
    },
    {
      title: 'Account',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Opening Balance',
          url:'opening-balance'
        },
        {
          title: 'Customerwise Cutting',
          url:'customerwise-cutting'
        },
        {
          title: 'Partywise Material Rate',
          url:'partywise-material-rate'
        },
        {
          title: 'Group Payment',
          url:'group-payment'
        },
        {
          title: 'Account Management',
          url:'account-management'
        },
        {
          title: 'Bonus Payment',
          url:'bonus-payment'
        }
      ]
    },
    {
      title: 'Dairy Production',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Milk Bag Production',
          url:'milk-bag-production'
        },
        {
          title: 'Batch Template',
          url:'batch-template'
        },
        {
          title: 'Batch Process',
          url:'batch-process'
        },
        {
          title: 'Batch Register',
          url:'batch-register'
        }
      ]
    },
    {
      title: 'Reports',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Customer Bill Report',
          url:'customer-bill-report'
        },
        {
          title: 'Daily Print Report',
          url:'daily-print-report'
        },
        {
          title: 'Milk Collection Report',
          url:'milk-collection-report'
        },
        {
          title: 'Milk Purchase Bill Summary',
          url:'milk-purchase-bill-summary-report'
        },
        {
          title: 'Irregular Customer List',
          url:'irregular-customer-list-report'
        },
        {
          title: 'Advance Summary Report',
          url:'advance-summary-report'
        },
        {
          title: 'Ledger Summary Report',
          url:'ledger-summary-report'
        },
        {
          title: 'Fodder Summary Report',
          url:'fodder-summary-report'
        },
        {
          title: 'Godown Stock Report',
          url:'godown-stock-report'
        },
        {
          title: 'Invoice Report',
          url:'invoice-report'
        }
      ]
    },
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
