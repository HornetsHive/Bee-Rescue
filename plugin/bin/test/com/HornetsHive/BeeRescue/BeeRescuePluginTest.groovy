/*
 * This Groovy source file was generated by the Gradle 'init' task.
 */
package com.HornetsHive.BeeRescue

import org.gradle.testfixtures.ProjectBuilder
import org.gradle.api.Project
import spock.lang.Specification

/**
 * A simple unit test for the 'com.HornetsHive.BeeRescue.greeting' plugin.
 */
class BeeRescuePluginTest extends Specification {
    def "plugin registers task"() {
        given:
        def project = ProjectBuilder.builder().build()

        when:
        project.plugins.apply("com.HornetsHive.BeeRescue.greeting")

        then:
        project.tasks.findByName("greeting") != null
    }
}
