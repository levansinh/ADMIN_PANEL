export interface MenuItem {
  path: string,
  display: string
}
export interface DropdownType {
  textButton: string;
  dropdownMenu: MenuItem[]
}