import citiesData from './cities.json';
import delhiData from './delhi.json';
import ghaziabadData from './ghaziabad.json';

export const CATEGORIES = [
  { id: 'damaged_road', label: 'Damaged road', description: 'Potholes, asphalt cave-ins, broken medians' },
  { id: 'overflowing_garbage', label: 'Overflowing garbage', description: 'Dhalao bins, roadside trash piles, transfer depots' },
  { id: 'fallen_tree', label: 'Fallen tree', description: 'Uprooted branches, storm debris, hazardous boughs' },
  { id: 'broken_traffic_signal', label: 'Broken traffic signal', description: 'Dead lights, broken casing, stuck signal phases' },
];

const cityDataMap = {
  delhi: delhiData,
  ghaziabad: ghaziabadData,
};

export function getCities() {
  return citiesData;
}

export function getCategories() {
  return CATEGORIES;
}

export function getAllPresetLocations() {
  return [
    ...delhiData.locations.map((loc) => ({ ...loc, city: 'delhi', cityName: 'Delhi NCT' })),
    ...ghaziabadData.locations.map((loc) => ({ ...loc, city: 'ghaziabad', cityName: 'Ghaziabad' })),
  ];
}

export function getLocationsForCity(cityId) {
  const data = cityDataMap[cityId];
  if (!data) return [];
  return data.locations.map((loc) => ({ ...loc, city: cityId, cityName: data.cityName }));
}

/**
 * Given a city, category, and location ID, returns the responsible authority, portal,
 * one-sentence plain reason, verification status, and verified_on date.
 */
export function getRouting({ city = 'delhi', category = 'damaged_road', locationId = 'anand_vihar_delhi' }) {
  const cityData = cityDataMap[city] || delhiData;
  const location =
    cityData.locations.find((loc) => loc.id === locationId) ||
    cityData.locations[0];

  const categoryRoute = location?.routes?.[category];

  if (!categoryRoute) {
    return {
      responsible_authority: `${cityData.cityName} Municipal Administration`,
      portal: {
        name: 'Official Citizen Redressal Portal',
        url: '#',
        field_hint: 'General Public Grievance',
      },
      reason: 'General civic complaint routed to default municipal nodal desk.',
      verified: false,
      verified_on: null,
      locationName: location?.name || 'Local Street',
      zone: location?.zone || 'Municipal Zone',
      isBorder: location?.isBorder || false,
      borderDetails: location?.borderDetails || null,
      city: cityData.city,
      cityName: cityData.cityName,
    };
  }

  return {
    responsible_authority: categoryRoute.responsible_authority,
    portal: categoryRoute.portal,
    reason: categoryRoute.reason,
    verified: categoryRoute.verified,
    verified_on: categoryRoute.verified_on,
    locationName: location.name,
    zone: location.zone,
    isBorder: location.isBorder,
    borderDetails: location.borderDetails || null,
    city: cityData.city,
    cityName: cityData.cityName,
  };
}
