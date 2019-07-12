<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to Vuetify <br/>
          Translation Test: {{$t('hello')}}
        </h1>
        <v-flex>
          <h2>
            Vuelidate test:
          </h2>
          <div>
            <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
              <label class="form__label">Name</label>
              <input class="form__input" v-model.trim="$v.name.$model"/>
            </div>
            <div class="error" v-if="!$v.name.required">Field is required</div>
            <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}}
              letters.
            </div>
            <tree-view :data="$v.name" :options="{rootObjectKey: '$v.name', maxDepth: 2}"></tree-view>
            <div class="form-group" :class="{ 'form-group--error': $v.age.$error }">
              <label class="form__label">Age</label>
              <input class="form__input" v-model.trim.lazy="$v.age.$model"/>
            </div>
            <div class="error" v-if="!$v.age.between">Must be between {{$v.age.$params.between.min}} and
              {{$v.age.$params.between.max}}
            </div>
            <span tabindex="0">Blur to see changes</span>
            <tree-view :data="$v.age" :options="{rootObjectKey: '$v.age', maxDepth: 2}"></tree-view>
          </div>
        </v-flex>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br>please join our online
          <a href="https://community.vuetifyjs.com" target="_blank">Discord Community</a>
        </p>
      </v-flex>

      <v-flex
        mb-5
        xs12
      >
        <h2 class="headline font-weight-bold mb-3">What's next?</h2>

        <v-layout justify-center>
          <a
            v-for="(next, i) in whatsNext"
            :key="i"
            :href="next.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ next.text }}
          </a>
        </v-layout>
      </v-flex>

      <v-flex
        xs12
        mb-5
      >
        <h2 class="headline font-weight-bold mb-3">Important Links</h2>

        <v-layout justify-center>
          <a
            v-for="(link, i) in importantLinks"
            :key="i"
            :href="link.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ link.text }}
          </a>
        </v-layout>
      </v-flex>

      <v-flex
        xs12
        mb-5
      >
        <h2 class="headline font-weight-bold mb-3">Ecosystem</h2>

        <v-layout justify-center>
          <a
            v-for="(eco, i) in ecosystem"
            :key="i"
            :href="eco.href"
            class="subheading mx-3"
            target="_blank"
          >
            {{ eco.text }}
          </a>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      name: '',
      age: 0,
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader'
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify'
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify'
        }
      ],
      importantLinks:
        [
          {
            text: 'Documentation',
            href: 'https://vuetifyjs.com'
          },
          {
            text: 'Chat',
            href: 'https://community.vuetifyjs.com'
          },
          {
            text: 'Made with Vuetify',
            href: 'https://madewithvuetifyjs.com'
          },
          {
            text: 'Twitter',
            href: 'https://twitter.com/vuetifyjs'
          },
          {
            text: 'Articles',
            href: 'https://medium.com/vuetify'
          }
        ],
      whatsNext:
        [
          {
            text: 'Explore components',
            href: 'https://vuetifyjs.com/components/api-explorer'
          },
          {
            text: 'Select a layout',
            href: 'https://vuetifyjs.com/layout/pre-defined'
          },
          {
            text: 'Frequently Asked Questions',
            href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions'
          }

        ]
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    age: {
      between: between(20, 30)
    }
  }
}
</script>

<style>

</style>
