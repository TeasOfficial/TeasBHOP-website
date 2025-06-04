<template>
  <router-view v-if="$route.path != '/main'" />
  <v-lazy v-else>
    <v-container>
      <div>
        <p class="text-h2 text-center mt-12">
          TeasBHOP
        </p>
        <p class="text-disabled text-center mt-3">
          {{ $t('main.subtitle') }}
        </p>
      </div>
      <br>
      <div class="mx-auto" style="width: 70%;">
        <p class="mb-5">
          {{ $t('main.serverlists.title') }}
        </p>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                {{ $t('main.serverlists.header.1') }}
              </th>
              <th class="text-right">
                {{ $t('main.serverlists.header.2') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Example Server #1</td>
              <td class="text-right">
                <v-btn>
                  {{ $t('main.serverlists.body.fastjoin') }}
                </v-btn>
              </td>
            </tr>
            <tr>
              <td>Example Server #2</td>
              <td class="text-right">
                <v-btn>
                  {{ $t('main.serverlists.body.fastjoin') }}
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <br>
      <div>
        <p class="mb-5 text-center">
          {{ $t('main.sociallink') }}
        </p>
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <v-btn href="https://discord.gg/Kbbyzy2gWw" target="_blank">
              {{ $t('social.discord') }} </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn href="https://space.bilibili.com/3494370055555759" target="_blank">
              {{ $t('social.bilibili') }}
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn href="https://github.com/TeasOfficial" target="_blank">
              {{ $t('social.github') }}
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <br>
      <div>
        <p class="mb-5 text-center">
          {{ $t('main.video.title') }}
        </p>
        <v-row align="center" justify="center">
          <v-col cols="auto">
            <iframe
              allowfullscreen="true"
              border="0"
              class="text-center"
              frameborder="no"
              framespacing="0"
              scrolling="no"
              src="//player.bilibili.com/player.html?&aid=114613551111260&bvid=BV1wB7Dz3EJu&cid=30286155417&p=1&autoplay=0"
              style="width: 40vw; height: 25vw;min-width: 300px;min-height: 150px;"
            />
          </v-col>
        </v-row>
      </div>
      <br>
    </v-container>
  </v-lazy>
</template>
