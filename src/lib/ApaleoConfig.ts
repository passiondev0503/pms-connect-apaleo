export const Config = {
  API_VERSION: 1,
  API_BASE_URL: 'https://api.apaleo.com/',
  AUTHORIZE_URL: 'https://identity.apaleo.com/connect/authorize',
  GENERATE_TOKEN_URL: 'https://identity.apaleo.com/connect/token',
  CLIENT_SCOPE:
    'offline_access profile:manage profile:read integration:ui-integrations.manage identity:account-users.manage identity:account-users.read distribution:reservations.manage distribution:subscriptions.manage payment:configuration.read payment:invoices.read payment:reports.read payment:transactions.read account.manage account.suspend accounting.read availability.manage availability.read companies.manage companies.read folios.manage folios.payment-with-charges folios.read invoices.manage invoices.read logs.read maintenances.manage maintenances.read offer-index.read offers.read operations.change-room-state operations.trigger-night-audit prepayment-notices.read rateplans.read-corporate rateplans.read-negotiated rates.manage rates.read reports.read reservations.force-manage reservations.manage reservations.read setup.manage setup.read openid profile'
};
