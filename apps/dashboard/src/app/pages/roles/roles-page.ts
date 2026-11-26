import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarGroup,
  ScAvatarGroupCount,
  ScAvatarImage,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScNativeSelect,
  ScNativeSelectContainer,
  ScNativeSelectIcon,
  ScNativeSelectOption,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScToaster,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';
import { PEOPLE } from '../../data/people';
import { PageHeader } from '../../layout/page-header';
import { count, initials } from '../../shared/format';
import { label } from '../../shared/labels';

type Role = 'Admin' | 'Editor' | 'Viewer';
type Action = 'view' | 'edit' | 'delete';

const ROLES: readonly { name: Role; text: string }[] = [
  {
    name: 'Admin',
    text: $localize`:@@roles.everythingBillingAndMembersIncluded:Everything, billing and members included.`,
  },
  {
    name: 'Editor',
    text: $localize`:@@roles.createsAndChangesContentNo:Creates and changes content; no billing.`,
  },
  {
    name: 'Viewer',
    text: $localize`:@@roles.readsDashboardsAndReports:Reads dashboards and reports.`,
  },
];

const RESOURCES = [
  'Dashboards',
  'Orders',
  'Customers',
  'Invoices',
  'Blog',
  'Billing',
];
const ACTIONS: readonly Action[] = ['view', 'edit', 'delete'];

const key = (role: Role, resource: string, action: Action) =>
  `${role}:${resource}:${action}`;

function defaults(): Set<string> {
  const set = new Set<string>();
  for (const resource of RESOURCES) {
    for (const action of ACTIONS) set.add(key('Admin', resource, action));
    if (resource !== 'Billing') {
      set.add(key('Editor', resource, 'view'));
      set.add(key('Editor', resource, 'edit'));
      set.add(key('Viewer', resource, 'view'));
    }
  }
  return set;
}

/** Roles & Permissions (Pro): what each role may do, who has which role. */
@Component({
  selector: 'app-roles-page',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarGroup,
    ScAvatarGroupCount,
    ScAvatarImage,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScNativeSelect,
    ScNativeSelectContainer,
    ScNativeSelectIcon,
    ScNativeSelectOption,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    SiChevronDownIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@roles.rolesPermissions"
      title="Roles & Permissions"
      [trail]="[{ label: t.pages }, { label: t.rolesPermissions }]"
    />

    <div class="grid gap-4 md:grid-cols-3">
      @for (role of roles; track role.name) {
        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>{{ labelOf(role.name) }}</h2>
            <p scCardDescription>{{ role.text }}</p>
          </div>
          <div scCardBody class="flex items-center justify-between">
            <div scAvatarGroup>
              @for (
                member of membersOf(role.name).slice(0, 3);
                track member.id
              ) {
                <span scAvatar size="sm">
                  <img
                    scAvatarImage
                    [src]="member.avatar"
                    [alt]="member.name"
                  />
                  <span scAvatarFallback>{{ initialsOf(member.name) }}</span>
                </span>
              }
              @if (membersOf(role.name).length > 3) {
                <div scAvatarGroupCount>
                  +{{ countOf(membersOf(role.name).length - 3) }}
                </div>
              }
            </div>
            <span i18n="@@roles.members" class="text-muted-foreground text-sm"
              >{{ countOf(membersOf(role.name).length) }} members</span
            >
          </div>
        </div>
      }
    </div>

    <div scCard>
      <div scCardHeader>
        <h2 i18n="@@roles.permissions" scCardTitle>Permissions</h2>
        <p i18n="@@roles.whatEachRoleMayDo" scCardDescription>
          What each role may do, by section
        </p>
      </div>
      <div scCardBody class="flex flex-col gap-4">
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th i18n="@@roles.section" scTableHeaderCell rowspan="2">
                  Section
                </th>
                @for (role of roles; track role.name) {
                  <th scTableHeaderCell colspan="3" class="text-center">
                    {{ labelOf(role.name) }}
                  </th>
                }
              </tr>
              <tr scTableRow>
                @for (role of roles; track role.name) {
                  @for (action of actions; track action) {
                    <th
                      scTableHeaderCell
                      class="text-center text-xs font-normal capitalize"
                    >
                      {{ labelOf(action) }}
                    </th>
                  }
                }
              </tr>
            </thead>
            <tbody scTableBody>
              @for (resource of resources; track resource) {
                <tr scTableRow>
                  <th scTableCell scope="row" class="text-start font-medium">
                    {{ labelOf(resource) }}
                  </th>
                  @for (role of roles; track role.name) {
                    @for (action of actions; track action) {
                      <td scTableCell class="text-center">
                        <input
                          scCheckbox
                          type="checkbox"
                          [attr.aria-label]="
                            role.name + ' may ' + action + ' ' + resource
                          "
                          [checked]="
                            granted().has(keyOf(role.name, resource, action))
                          "
                          [disabled]="role.name === 'Admin'"
                          (change)="toggle(role.name, resource, action)"
                        />
                      </td>
                    }
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div class="flex justify-end">
          <button i18n="@@roles.savePermissions" scButton (click)="save()">
            Save permissions
          </button>
        </div>
      </div>
    </div>

    <div scCard>
      <div scCardHeader>
        <h2 i18n="@@roles.members2" scCardTitle>Members</h2>
      </div>
      <div scCardBody>
        <div scTableContainer>
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th i18n="@@roles.member" scTableHeaderCell>Member</th>
                <th i18n="@@roles.email" scTableHeaderCell>Email</th>
                <th i18n="@@roles.role" scTableHeaderCell class="w-44">Role</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (person of people; track person.id) {
                <tr scTableRow>
                  <td scTableCell>
                    <div class="flex items-center gap-2">
                      <span scAvatar class="size-7">
                        <img scAvatarImage [src]="person.avatar" alt="" />
                        <span scAvatarFallback>{{
                          initialsOf(person.name)
                        }}</span>
                      </span>
                      <span class="font-medium">{{ person.name }}</span>
                    </div>
                  </td>
                  <td scTableCell>{{ person.email }}</td>
                  <td scTableCell>
                    <div scNativeSelectContainer class="w-full">
                      <select
                        scNativeSelect
                        size="sm"
                        [attr.aria-label]="t.roleOf + person.name"
                        [value]="roleOf()[person.id]"
                        (change)="setRole(person.id, $any($event.target).value)"
                      >
                        @for (role of roles; track role.name) {
                          <option scNativeSelectOption [value]="role.name">
                            {{ labelOf(role.name) }}
                          </option>
                        }
                      </select>
                      <svg siChevronDownIcon scNativeSelectIcon></svg>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RolesPage {
  /** In the user's numbering system. */
  private readonly countOf = count;

  private readonly labelOf = label;
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    pages: $localize`:@@roles.pages:Pages`,
    rolesPermissions: $localize`:@@roles.rolesPermissions:Roles & Permissions`,
    roleOf: $localize`:@@roles.roleOf:Role of `,
  };

  private readonly toaster = inject(ScToaster);
  private readonly roles = ROLES;
  private readonly resources = RESOURCES;
  private readonly actions = ACTIONS;
  private readonly people = PEOPLE;
  private readonly granted = signal(defaults());
  private readonly roleOf = signal<Record<number, Role>>(
    Object.fromEntries(
      PEOPLE.map((p) => [
        p.id,
        p.id <= 2 ? 'Admin' : p.id <= 6 ? 'Editor' : 'Viewer',
      ]),
    ),
  );
  private readonly members = computed(() => {
    const roles = this.roleOf();
    return (role: Role) => PEOPLE.filter((p) => roles[p.id] === role);
  });
  private readonly keyOf = key;
  private readonly initialsOf = initials;

  private membersOf(role: Role) {
    return this.members()(role);
  }

  private toggle(role: Role, resource: string, action: Action): void {
    this.granted.update((set) => {
      const next = new Set(set);
      const k = key(role, resource, action);
      if (!next.delete(k)) next.add(k);
      return next;
    });
  }

  private setRole(id: number, role: Role): void {
    this.roleOf.update((roles) => ({ ...roles, [id]: role }));
    const person = PEOPLE.find((p) => p.id === id);
    this.toaster.show({
      title: $localize`:@@roles.isNow:${person?.name} is now ${role}`,
    });
  }

  private save(): void {
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@roles.permissionsSaved:Permissions saved`,
    });
  }
}
