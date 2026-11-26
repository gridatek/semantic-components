import { Component, ViewEncapsulation, computed } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemGroup,
  ScItemMedia,
  ScItemTitle,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScTimeline,
  ScTimelineConnector,
  ScTimelineDescription,
  ScTimelineItem,
  ScTimelineMarker,
  ScTimelineTime,
  ScTimelineTitle,
} from '@semantic-components/ui';
import {
  ScChart,
  ScChartBar,
  ScChartCategoryAxis,
  type ScChartConfig,
  ScChartCursor,
  ScChartGrid,
  ScChartPlot,
} from '@semantic-components/ui/charts';
import {
  SiBookOpenIcon,
  SiCalendarCheckIcon,
  SiGraduationCapIcon,
  SiTrendingUpIcon,
  SiUsersIcon,
} from '@semantic-icons/lucide-icons';
import {
  AppStatCard,
  AppStatCardChange,
  AppStatCardDescription,
  AppStatCardIcon,
  AppStatCardLabel,
  AppStatCardValue,
} from '../../components/stat-card';
import { PEOPLE } from '../../data/people';
import { PageHeader } from '../../layout/page-header';
import { ChartLegend, ChartTooltip } from '../../shared/chart-parts';
import {
  axisLabel,
  count,
  hour,
  initials,
  monthDay,
  percent,
} from '../../shared/format';

const ATTENDANCE = [
  { day: 'Mon', present: 1162, absent: 78 },
  { day: 'Tue', present: 1188, absent: 52 },
  { day: 'Wed', present: 1171, absent: 69 },
  { day: 'Thu', present: 1149, absent: 91 },
  { day: 'Fri', present: 1104, absent: 136 },
];

const EXAMS = [
  {
    subject: $localize`:@@dashboards.school.mathematics:Mathematics`,
    grade: 10,
    date: 'May 4',
    room: $localize`:@@dashboards.school.hallA:Hall A`,
  },
  {
    subject: $localize`:@@dashboards.school.physics:Physics`,
    grade: 11,
    date: 'May 6',
    room: $localize`:@@dashboards.school.lab2:Lab 2`,
  },
  {
    subject: $localize`:@@dashboards.school.englishLiterature:English Literature`,
    grade: 9,
    date: 'May 7',
    room: $localize`:@@dashboards.school.room14:Room 14`,
  },
  {
    subject: $localize`:@@dashboards.school.history:History`,
    grade: 12,
    date: 'May 11',
    room: $localize`:@@dashboards.school.hallB:Hall B`,
  },
];

const STUDENTS = [
  {
    personId: 6,
    grade: 12,
    average: 96.4,
    attendance: 0.99,
  },
  {
    personId: 2,
    grade: 11,
    average: 94.8,
    attendance: 0.97,
  },
  {
    personId: 9,
    grade: 12,
    average: 93.1,
    attendance: 0.98,
  },
  {
    personId: 4,
    grade: 10,
    average: 92.7,
    attendance: 0.96,
  },
  {
    personId: 7,
    grade: 9,
    average: 91.9,
    attendance: 1,
  },
];

const NOTICES = [
  {
    title: $localize`:@@dashboards.school.scienceFair:Science fair`,
    text: () =>
      $localize`:@@dashboards.school.projectsGoUpInThe:Projects go up in the gym on Friday; parents welcome from ${hour(15)}:time:.`,
    at: '2026-04-24',
    status: 'complete' as const,
  },
  {
    title: $localize`:@@dashboards.school.parentTeacherMeetings:Parent–teacher meetings`,
    text: $localize`:@@dashboards.school.bookASlotWithEach:Book a slot with each teacher through the portal.`,
    at: '2026-04-30',
    status: 'current' as const,
  },
  {
    title: $localize`:@@dashboards.school.examWeek:Exam week`,
    text: $localize`:@@dashboards.school.timetablesArePinnedOutsideThe:Timetables are pinned outside the staff room.`,
    at: '2026-05-04',
    status: 'upcoming' as const,
  },
  {
    title: $localize`:@@dashboards.school.sportsDay:Sports day`,
    text: () =>
      $localize`:@@dashboards.school.onTheFieldFrom9:On the field from ${hour(9)}:time:; bring water and a hat.`,
    at: '2026-05-22',
    status: 'upcoming' as const,
  },
];

/** School (Pro): students, attendance, exams, notices. */
@Component({
  selector: 'app-school-page',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemGroup,
    ScItemMedia,
    ScItemTitle,
    AppStatCard,
    AppStatCardChange,
    AppStatCardDescription,
    AppStatCardIcon,
    AppStatCardLabel,
    AppStatCardValue,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScTimeline,
    ScTimelineConnector,
    ScTimelineDescription,
    ScTimelineItem,
    ScTimelineMarker,
    ScTimelineTime,
    ScTimelineTitle,
    ScChart,
    ScChartBar,
    ScChartCategoryAxis,
    ScChartCursor,
    ScChartGrid,
    ScChartPlot,
    SiBookOpenIcon,
    SiCalendarCheckIcon,
    SiGraduationCapIcon,
    SiTrendingUpIcon,
    SiUsersIcon,
    PageHeader,
    ChartLegend,
    ChartTooltip,
  ],
  template: `
    <app-page-header
      i18n-title="@@dashboards.school.school"
      title="School"
      [trail]="[{ label: t.dashboards }, { label: t.school }]"
    />

    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.school.students"
            >Students</ng-container
          >
          <svg siGraduationCapIcon appStatCardIcon></svg>
        </dt>
        <dd appStatCardValue [value]="1240"></dd>
        <dd
          appStatCardChange
          [value]="0.032"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n="@@dashboards.school.fromLastYear" appStatCardDescription>
          from last year
        </dd>
      </dl>
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.school.teachers"
            >Teachers</ng-container
          >
          <svg siUsersIcon appStatCardIcon></svg>
        </dt>
        <dd appStatCardValue [value]="86"></dd>
        <dd i18n="@@dashboards.school.n144StudentsEach" appStatCardDescription>
          {{ countOf(14.4) }} students each
        </dd>
      </dl>
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.school.classes"
            >Classes</ng-container
          >
          <svg siBookOpenIcon appStatCardIcon></svg>
        </dt>
        <dd appStatCardValue [value]="48"></dd>
        <dd i18n="@@dashboards.school.across4Grades" appStatCardDescription>
          across {{ countOf(4) }} grades
        </dd>
      </dl>
      <dl appStatCard>
        <dt appStatCardLabel>
          <ng-container i18n="@@dashboards.school.attendanceToday"
            >Attendance today</ng-container
          >
          <svg siCalendarCheckIcon appStatCardIcon></svg>
        </dt>
        <dd
          appStatCardValue
          [value]="0.937"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        ></dd>
        <dd
          appStatCardChange
          [value]="0.012"
          [format]="{ style: 'percent', maximumFractionDigits: 1 }"
        >
          <svg siTrendingUpIcon></svg>
        </dd>
        <dd i18n="@@dashboards.school.fromYesterday" appStatCardDescription>
          from yesterday
        </dd>
      </dl>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      <div scCard class="xl:col-span-2">
        <div scCardHeader>
          <h2 i18n="@@dashboards.school.attendance" scCardTitle>Attendance</h2>
          <p i18n="@@dashboards.school.thisWeekByDay" scCardDescription>
            This week, by day
          </p>
        </div>
        <div scCardBody>
          <div
            scChart
            [config]="attendanceConfig"
            [data]="attendance"
            class="h-72 w-full"
          >
            <svg
              i18n-aria-label="@@dashboards.school.attendanceByDay"
              scChartPlot
              categoryKey="day"
              aria-label="Attendance by day"
            >
              <g scChartGrid />
              <g scChartCategoryAxis />
              <g scChartCursor />
              <g scChartBar key="present" stack="a" />
              <g scChartBar key="absent" stack="a" />
            </svg>
            <app-chart-tooltip />
            <app-chart-legend />
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@dashboards.school.upcomingExams" scCardTitle>
            Upcoming exams
          </h2>
          <p i18n="@@dashboards.school.theNextTwoWeeks" scCardDescription>
            The next two weeks
          </p>
        </div>
        <div scCardBody>
          <div scItemGroup class="gap-2">
            @for (exam of exams; track exam.subject) {
              <div scItem variant="outline" size="sm">
                <div
                  scItemMedia
                  class="bg-muted flex size-10 flex-col items-center justify-center rounded-md text-xs leading-tight font-medium"
                >
                  {{ monthDayOf(exam.date) }}
                </div>
                <div scItemBody>
                  <div scItemTitle>{{ exam.subject }}</div>
                  <p scItemDescription>
                    {{ gradeOf(exam.grade) }} · {{ exam.room }}
                  </p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-4 xl:grid-cols-3">
      <div scCard class="xl:col-span-2">
        <div scCardHeader>
          <h2 i18n="@@dashboards.school.topStudents" scCardTitle>
            Top students
          </h2>
          <p i18n="@@dashboards.school.byAverageThisTerm" scCardDescription>
            By average this term
          </p>
        </div>
        <div scCardBody>
          <div scTableContainer>
            <table scTable>
              <thead scTableHeader>
                <tr scTableRow>
                  <th i18n="@@dashboards.school.student" scTableHeaderCell>
                    Student
                  </th>
                  <th i18n="@@dashboards.school.grade" scTableHeaderCell>
                    Grade
                  </th>
                  <th
                    i18n="@@dashboards.school.average"
                    scTableHeaderCell
                    class="text-end"
                  >
                    Average
                  </th>
                  <th
                    i18n="@@dashboards.school.attendance"
                    scTableHeaderCell
                    class="text-end"
                  >
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody scTableBody>
                @for (student of students; track student.person.id) {
                  <tr scTableRow>
                    <td scTableCell>
                      <div class="flex items-center gap-2">
                        <span scAvatar class="size-7">
                          <img
                            scAvatarImage
                            [src]="student.person.avatar"
                            alt=""
                          />
                          <span scAvatarFallback>{{
                            initialsOf(student.person.name)
                          }}</span>
                        </span>
                        <span class="font-medium">{{
                          student.person.name
                        }}</span>
                      </div>
                    </td>
                    <td scTableCell>
                      <span scBadge variant="outline">{{
                        gradeOf(student.grade)
                      }}</span>
                    </td>
                    <td scTableCell class="text-end tabular-nums">
                      {{ countOf(student.average) }}
                    </td>
                    <td scTableCell class="text-end tabular-nums">
                      {{ percentOf(student.attendance) }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2 i18n="@@dashboards.school.noticeBoard" scCardTitle>
            Notice board
          </h2>
        </div>
        <div scCardBody>
          <ol
            i18n-aria-label="@@dashboards.school.notices"
            scTimeline
            aria-label="Notices"
          >
            @for (notice of notices(); track notice.title) {
              <li scTimelineItem [status]="notice.status">
                <span scTimelineMarker></span>
                <span scTimelineConnector></span>
                <p scTimelineTitle>{{ notice.title }}</p>
                <p scTimelineDescription>{{ notice.text }}</p>
                <time scTimelineTime [value]="notice.at"></time>
              </li>
            }
          </ol>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class SchoolPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    dashboards: $localize`:@@dashboards.school.dashboards:Dashboards`,
    school: $localize`:@@dashboards.school.school:School`,
  };

  private readonly attendance = ATTENDANCE.map((row) => ({
    ...row,
    day: axisLabel(row.day),
  }));
  private readonly attendanceConfig: ScChartConfig = {
    present: {
      label: $localize`:@@dashboards.school.present:Present`,
      color: 'var(--chart-2)',
    },
    absent: {
      label: $localize`:@@dashboards.school.absent:Absent`,
      color: 'var(--chart-4)',
    },
  };
  private readonly exams = EXAMS;
  private readonly students = STUDENTS.map((student) => ({
    ...student,
    person: PEOPLE.find((p) => p.id === student.personId) ?? PEOPLE[0],
  }));
  private readonly notices = computed(() =>
    NOTICES.map((notice) => ({
      ...notice,
      text: typeof notice.text === 'function' ? notice.text() : notice.text,
      at: Temporal.PlainDate.from(notice.at),
    })),
  );
  private readonly countOf = count;
  private readonly percentOf = percent;
  private readonly monthDayOf = monthDay;

  /** A grade, its number in the user's numbering system. */
  private gradeOf(grade: number): string {
    return $localize`:@@dashboards.school.gradeN:Grade ${count(grade)}:grade:`;
  }
  private readonly initialsOf = initials;
}
